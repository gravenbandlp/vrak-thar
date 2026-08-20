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

  var ctx = null, master = null, muted = false;

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

  /* ---------- TAB: tick elettronico secco, pitch discendente ---------- */
  function tabTick(){
    if (muted) return;
    var c = ready(); if (!c) return;
    var t = c.currentTime;

    var out = c.createGain();
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(0.22, t + 0.004);
    out.gain.exponentialRampToValueAtTime(0.0001, t + 0.115);
    out.connect(master);

    var bp = c.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(1650, t);
    bp.Q.value = 4.5;
    bp.connect(out);

    var o1 = c.createOscillator();
    o1.type = 'square';
    o1.frequency.setValueAtTime(1180, t);
    o1.frequency.exponentialRampToValueAtTime(745, t + 0.085);
    o1.connect(bp);

    var o2 = c.createOscillator();
    o2.type = 'triangle';
    o2.frequency.setValueAtTime(2370, t);
    o2.frequency.exponentialRampToValueAtTime(1495, t + 0.085);
    var g2 = c.createGain();
    g2.gain.value = 0.32;
    o2.connect(g2); g2.connect(bp);

    o1.start(t); o2.start(t);
    o1.stop(t + 0.14); o2.stop(t + 0.14);

    /* transiente meccanico iniziale */
    var nb = c.createBufferSource();
    nb.buffer = noiseBuffer(c, 0.018);
    var hp = c.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 2400;
    var ng = c.createGain();
    ng.gain.setValueAtTime(0.09, t);
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
  var ICON_ON  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 9v6h3.5L12 19V5L7.5 9z"/><path d="M15.5 9.5a3.5 3.5 0 010 5"/><path d="M18 7a7 7 0 010 10"/></svg>';
  var ICON_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 9v6h3.5L12 19V5L7.5 9z"/><path d="M16 10l4 4M20 10l-4 4"/></svg>';

  function buildToggle(){
    var host = document.querySelector('.brand') || document.querySelector('.tabs');
    if (!host) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn sound-toggle';
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', 'Disattiva i suoni dell\u2019interfaccia');
    b.innerHTML = ICON_ON + '<span>Audio</span>';
    b.addEventListener('click', function(){
      muted = !muted;
      b.setAttribute('aria-pressed', String(muted));
      b.setAttribute('aria-label', muted
        ? 'Attiva i suoni dell\u2019interfaccia'
        : 'Disattiva i suoni dell\u2019interfaccia');
      b.innerHTML = (muted ? ICON_OFF : ICON_ON) + '<span>Audio</span>';
      if (!muted) tabTick();
    });
    host.appendChild(b);
  }

  /* ---------- wiring ---------- */
  var INTERNAL = '.step, .pip, .power, button.btn, a.btn, .cx';

  function wire(){
    buildToggle();

    document.addEventListener('click', function(e){
      if (!e.target || !e.target.closest) return;

      var tab = e.target.closest('.tab');
      if (tab){
        tabTick();
        var href = tab.getAttribute('href');
        /* Ritardo minimo per far suonare il tick prima che la pagina cambi.
           Saltato per le ancore interne e per l'apertura in nuova scheda. */
        if (href && href.charAt(0) !== '#' &&
            e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey){
          e.preventDefault();
          setTimeout(function(){ window.location.href = href; }, 95);
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
