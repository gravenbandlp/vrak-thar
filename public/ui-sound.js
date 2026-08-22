/* =========================================================
   VRAK THAR — UI sound
   Suoni sintetizzati via Web Audio API. Nessun file audio.

   tabTick()  → click sulle tab di navigazione
   pageTurn() → click sugli elementi interattivi interni

   L'AudioContext si inizializza al primo click: i browser
   non permettono audio senza un gesto dell'utente.
   ========================================================= */

(function(){
  'use strict';

  /* Ogni tab ricarica la pagina, quindi la scelta va ricordata:
     senza questo l'audio si riaccende a ogni navigazione. */
  var STORE = 'vt-audio';

  var ctx = null, master = null, muted = loadMuted();

  function init(){
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch(e){ return null; }
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
    return ctx;
  }

  function ready(){
    var c = init();
    if (!c) return null;
    if (c.state === 'suspended' && c.resume) c.resume();
    return c;
  }

  function noiseBuffer(c, dur){
    var len = Math.max(1, Math.ceil(c.sampleRate * dur));
    var b = c.createBuffer(1, len, c.sampleRate);
    var d = b.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  /* ---------- TAB: data burst, due bip in sequenza ---------- */
  /* Il secondo bip e' piu' acuto del primo: non legge come un click ma come
     un terminale che conferma l'input. Dura in tutto ~113 ms, e la
     navigazione va ritardata almeno altrettanto (vedi ATTESA_TAB). */
  function bip(c, t, freq, amp, dur){
    var g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(amp, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(master);

    /* banda stretta centrata poco sopra la fondamentale: toglie corpo
       alla quadra e lascia solo lo squillo */
    var bp = c.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = freq * 1.1;
    bp.Q.value = 8;
    bp.connect(g);

    var o = c.createOscillator();
    o.type = 'square';
    o.frequency.setValueAtTime(freq, t);
    o.connect(bp);
    o.start(t); o.stop(t + dur + 0.01);
  }

  function tabTick(){
    if (muted) return;
    var c = ready(); if (!c) return;
    var t = c.currentTime;

    bip(c, t,         988,  0.17, 0.032);
    bip(c, t + 0.055, 1568, 0.15, 0.048);

    /* transiente meccanico iniziale */
    var nb = c.createBufferSource();
    nb.buffer = noiseBuffer(c, 0.018);
    var hp = c.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 2400;
    var ng = c.createGain();
    ng.gain.setValueAtTime(0.07, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);
    nb.connect(hp); hp.connect(ng); ng.connect(master);
    nb.start(t); nb.stop(t + 0.02);
  }

  /* ---------- INTERNI: fruscio tipo pagina sfogliata ---------- */
  function pageTurn(){
    if (muted) return;
    var c = ready(); if (!c) return;
    var t = c.currentTime, dur = 0.185;

    var src = c.createBufferSource();
    src.buffer = noiseBuffer(c, dur);

    var bp = c.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 0.85;
    bp.frequency.setValueAtTime(430, t);
    bp.frequency.exponentialRampToValueAtTime(2700, t + 0.07);
    bp.frequency.exponentialRampToValueAtTime(680, t + dur);

    var lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 5200;

    var g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.15, t + 0.028);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    src.connect(bp); bp.connect(lp); lp.connect(g); g.connect(master);
    src.start(t); src.stop(t + dur);
  }

  /* ---------- toggle audio ---------- */
  var ICON_ON  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M4 9v6h3.5L12 19V5L7.5 9z"/><path d="M15.5 9.5a3.5 3.5 0 010 5"/><path d="M18 7a7 7 0 010 10"/></svg>';
  var ICON_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M4 9v6h3.5L12 19V5L7.5 9z"/><path d="M16 10l4 4M20 10l-4 4"/></svg>';

  function loadMuted(){
    try { return localStorage.getItem(STORE) === 'off'; } catch(e){ return false; }
  }
  function saveMuted(v){
    try { localStorage.setItem(STORE, v ? 'off' : 'on'); } catch(e){}
  }

  function buildToggle(){
    var host = document.querySelector('.brand') || document.querySelector('.tabs');
    if (!host) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn sound-toggle';
    b.title = 'Suoni dell’interfaccia';

    /* Toggle standard: il nome accessibile resta "Audio" e lo stato
       lo porta aria-pressed, dove true = suoni attivi. */
    function paint(){
      b.setAttribute('aria-pressed', String(!muted));
      b.innerHTML = (muted ? ICON_OFF : ICON_ON) + '<span>Audio</span>';
    }
    paint();

    b.addEventListener('click', function(){
      muted = !muted;
      saveMuted(muted);
      paint();
      if (!muted) tabTick();
    });
    host.appendChild(b);
  }

  /* ---------- wiring ---------- */
  var INTERNAL = '.step, .pip, .power, button.btn, a.btn, .cx';
  var ATTESA_TAB = 130;

  function wire(){
    buildToggle();

    document.addEventListener('click', function(e){
      if (!e.target || !e.target.closest) return;

      var tab = e.target.closest('.tab');
      if (tab){
        tabTick();
        var href = tab.getAttribute('href');
        /* Ritardo per far finire il tick prima che la pagina cambi: la
           navigazione distrugge l'AudioContext e taglierebbe il secondo bip.
           Saltato per le ancore interne e per l'apertura in nuova scheda. */
        if (href && href.charAt(0) !== '#' &&
            e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey){
          e.preventDefault();
          setTimeout(function(){ window.location.href = href; }, ATTESA_TAB);
        }
        return;
      }

      var el = e.target.closest(INTERNAL);
      if (el && !el.classList.contains('sound-toggle')) pageTurn();
    }, false);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }

  window.VTSound = { tab: tabTick, turn: pageTurn,
                     mute: function(v){ muted = !!v; } };
})();
