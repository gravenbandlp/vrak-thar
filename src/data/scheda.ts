/* =========================================================
   VRAK THAR — dati di scheda
   Unico posto da toccare quando il personaggio sale di livello.
   I campi di testo accettano HTML inline (<b>, <br>).
   ========================================================= */

export const profilo = {
  nome: 'Vrak',
  cognome: 'Thar',
  sottotitolo: 'Zabrak · Tradizione Matukai · Jedi 4',
  ritratto: '/vrak-thar.jpg',
  ritrattoAlt:
    'Ritratto di Vrak Thar, guerriero Zabrak dal cranio rasato con corna e tatuaggi tribali neri sul volto',
  ritrattoAltIntero:
    'Vrak Thar a figura intera: Zabrak muscoloso in tunica di stoffa grezza incrociata sul petto, avambracci fasciati, spada laser accesa nella mano destra',
  chip: [
    { l: 'BAB', v: '+4' },
    { l: 'Velocità', v: '6 caselle' },
    { l: 'Taglia', v: 'Media' },
    { l: 'Altezza', v: '1,85 m' },
    { l: 'Peso', v: '90 kg' },
    { l: 'Lingue', v: 'Basic, Zabrak' },
  ],
  tratti: {
    etichetta: 'Tratti Zabrak',
    testo:
      '<b>Heightened Awareness</b> — puoi ritirare qualsiasi prova di Percezione, ma devi accettare il secondo risultato anche se peggiore.<br><b>Superior Defenses</b> — +1 di specie a tutte le Difese, già incluso nei valori qui sotto.',
  },
};

export const caratteristiche = [
  { l: 'For', s: 16, m: '+3' },
  { l: 'Des', s: 10, m: '+0' },
  { l: 'Cos', s: 16, m: '+3' },
  { l: 'Int', s: 10, m: '+0' },
  { l: 'Sag', s: 12, m: '+1' },
  { l: 'Car', s: 14, m: '+2' },
];

/* base = valore a condizione normale: il condition track lo ricalcola da solo */
export const difese = [
  { l: 'Riflessi', base: 17, soglia: false },
  { l: 'Tempra', base: 19, soglia: false },
  { l: 'Volontà', base: 17, soglia: false },
  { l: 'Soglia danno', base: 19, soglia: true },
];

export const risorse = {
  hpMax: 57,
  fpMax: 7,
  secondWind: 16,
  hpNota:
    'Second Wind recupera <b>16 PF</b>: un quarto dei PF totali (14) o il punteggio di Costituzione (16), il maggiore dei due — qui vince Costituzione. Azione veloce, <b>1 volta al giorno</b> e mai più di una volta nello stesso incontro.',
  fpTitolo: 'Punti Forza — 5 + metà livello',
  fpNota:
    'Spendine uno per aggiungere <b>1d6</b> a una prova, o per attivare capacità specifiche. Si ricaricano interamente ad ogni passaggio di livello: i residui vanno persi.',
  formule:
    'RIF 10 +4 livello +0 Des +1 classe +1 specie +1 schivata<br>TEM 10 +4 livello +3 Cos +1 classe +1 specie<br>VOL 10 +4 livello +1 Sag +1 classe +1 specie',
};

export const conditionTrack = [
  { pen: 0, l: '0', nome: 'Normale' },
  { pen: 1, l: '−1', nome: 'Malconcio' },
  { pen: 2, l: '−2', nome: 'Provato' },
  { pen: 5, l: '−5', nome: 'Debilitato' },
  { pen: 10, l: '−10', nome: 'Stremato' },
  { pen: 99, l: 'KO', nome: 'Svenuto', ko: true },
];

export const conditionNota =
  'La penalità si applica a <b>tiri per colpire, Difese, prove di abilità e prove di caratteristica</b>, e di riflesso anche alla Soglia di Danno, perché deriva dalla Tempra.<br><span class="lbl">Risalire</span> spendi tre azioni veloci, anche distribuite su più round, con l\'azione <b>Recover</b>: guadagni +1 passo.';

export const attacchi = {
  hint: 'spada laser · 2d8 · energia e tagliente',
  righe: [
    {
      modo: 'Una mano',
      colpire: 8,
      danni: '2d8+5',
      note: 'Mano libera per Move Light Object o per una presa',
    },
    {
      modo: 'Due mani',
      colpire: 8,
      danni: '2d8+8',
      note: 'Bonus di Forza raddoppiato — il tuo default',
    },
    {
      modo: 'Due mani + Power Attack (−4)',
      colpire: 4,
      danni: '2d8+16',
      note: 'A due mani il malus si converte in danno raddoppiato',
    },
    {
      modo: 'Due mani + Battle Strike (CD 15)',
      colpire: 9,
      danni: '2d8+1d6+8',
      note: 'Azione veloce prima dell\'attacco',
    },
    {
      modo: 'Senz\'armi',
      colpire: 7,
      danni: '1d6+5',
      note: 'Martial Arts I porta il dado da 1d4 a 1d6; niente Weapon Focus',
    },
  ],
  nota:
    '<span class="lbl">Danno in mischia</span> dado dell\'arma + metà livello eroico (+2) + mod. Forza, raddoppiato impugnando a due mani.<br><span class="lbl">Turno tipo</span> Battle Strike come azione veloce, poi attacco a due mani con Power Attack calibrato sul bersaglio.',
};

export const attitudini = {
  etichetta: 'Attitudini · Lightsaber Combat',
  voci: [
    {
      t: 'Block',
      m: 'Reazione · liv. 1',
      p: 'Annulli un attacco <b>in mischia</b> con una prova di Usare la Forza. CD pari al risultato del tiro per colpire che vuoi annullare.',
    },
    {
      t: 'Deflect',
      m: 'Reazione · liv. 3',
      p: 'Annulli un attacco <b>a distanza</b> allo stesso modo. Funziona anche contro raffiche in Autofire e contro Force Lightning: se superi la prova subisci metà danno se l\'attacco colpisce, nessuno se manca.',
    },
  ],
  alert:
    'Entrambi richiedono spada laser <b>estratta e accesa</b>, e che tu sia consapevole dell\'attacco e <b>non colto alla sprovvista</b>. Penalità cumulativa di <b>−5</b> alla prova per ogni volta che hai già usato Block o Deflect dall\'inizio del tuo ultimo turno.',
};

export const talenti = [
  {
    t: 'Force Sensitivity',
    m: 'Da classe · gratuito',
    p: 'Sblocca l\'abilità Usare la Forza e l\'accesso alle Attitudini della Forza.',
  },
  {
    t: 'Weapon Proficiency',
    m: 'Da classe · spade laser + armi semplici',
    p: 'Nessuna penalità di −5 ai tiri per colpire con queste categorie.',
  },
  {
    t: 'Force Training',
    m: 'Liv. 1 · talento generale',
    p: 'Aggiunge alla suite un numero di poteri pari a 1 + mod. Saggezza. Con SAG 12 → <b>2 poteri</b>.',
  },
  {
    t: 'Weapon Focus (spade laser)',
    m: 'Liv. 2 · talento bonus Jedi',
    p: '+1 ai tiri per colpire, già incluso nei numeri della tabella attacchi.',
  },
  {
    t: 'Power Attack',
    m: 'Liv. 3 · talento generale',
    p: 'Prima del tiro sottrai fino al tuo BAB dagli attacchi in mischia e aggiungi lo stesso numero ai danni, <b>raddoppiato</b> impugnando a due mani. Vale fino all\'inizio del tuo turno successivo.',
  },
  {
    t: 'Martial Arts I',
    m: 'Liv. 4 · talento bonus Jedi',
    p: '+1 di schivata alla Difesa Riflessi, già incluso nei valori qui sopra: lo perdi quando sei colto alla sprovvista. Il danno senz\'armi sale di un passo, da 1d4 a <b>1d6</b>.',
  },
];

export const poteri = {
  voci: [
    {
      t: 'Battle Strike',
      p: 'Azione veloce, su di te. +1 Forza al prossimo tiro per colpire entro la fine del tuo prossimo turno, più danni extra se colpisci.<br><b>CD 15</b> attivazione, +1d6 · <b>CD 20</b> +2d6 · <b>CD 25</b> +3d6.<br>Spendendo un Punto Forza: altri 2d6.',
    },
    {
      t: 'Surge',
      p: 'Azione gratuita, su di te. Bonus alle prove di Saltare e aumento di velocità fino all\'inizio del tuo prossimo turno.<br><b>CD 10</b> +10 e +2 caselle · <b>CD 15</b> +20 e +4 · <b>CD 20</b> +30 e +6.<br>Conta come rincorsa per determinare la CD di un salto.',
    },
  ],
  nota:
    'Un potere usato esce dalla suite a prescindere dall\'esito della prova, e si recupera a fine incontro.',
};

/* due colonne, come nell'originale */
export const abilita = {
  colonne: [
    [
      { k: 'Usare la Forza', sub: 'Car · addestrata', base: 9, addestrata: true },
      { k: 'Iniziativa', sub: 'Des · addestrata', base: 7, addestrata: true },
      { k: 'Resistenza', sub: 'Cos', base: 5, addestrata: false },
      { k: 'Saltare', sub: 'For', base: 5, addestrata: false },
    ],
    [
      { k: 'Scalare', sub: 'For', base: 5, addestrata: false },
      { k: 'Persuasione', sub: 'Car', base: 4, addestrata: false },
      { k: 'Percezione', sub: 'Sag', base: 3, addestrata: false },
      { k: 'Acrobazia', sub: 'Des', base: 2, addestrata: false },
    ],
  ],
  nota:
    'Il Jedi ottiene 2 + mod. Intelligenza abilità addestrate: con INT 10 solo due. Usare la Forza è <b>addestrata obbligatoria</b>, perché quasi tutte le sue applicazioni non funzionano senza. Percezione addestrata varrebbe +8 e avrebbe ottima sinergia con Heightened Awareness: candidata naturale per Skill Training a un livello futuro.',
  alert:
    '<b>Regola della casa — Abilità Focalizzata</b><br>Su <b>Usare la Forza</b> il talento non dà +5 secco ma un bonus che scala col livello: <b>+1</b> dal liv. 1 · <b>+2</b> dal liv. 4 · <b>+3</b> dal liv. 8 · <b>+4</b> dal liv. 12 · <b>+5</b> dal liv. 16 · <b>+6</b> al liv. 20. Su tutte le altre abilità resta il +5 fisso da manuale.',
};

export const inventario = {
  voci: [
    { v: 'Crediti', n: '4.870' },
    { v: 'Spada laser', n: 'assemblata da lui, non sintonizzata' },
    { v: 'Nessuna armatura', n: 'dottrina Matukai' },
    { v: 'Utility belt', n: '500 cr' },
    { v: 'Medpac ×6', n: '600 cr — 100 cad.' },
    { v: 'Medical kit', n: '600 cr' },
    { v: 'Mantello ognitempo', n: '100 cr' },
    { v: 'Maschera respiratoria + 4 filtri', n: '300 cr' },
    { v: 'Aquata breather', n: '350 cr' },
  ],
  loot: [
    { v: 'Vibropicca ×2', n: '' },
    { v: 'Pistola blaster ×2', n: '' },
    { v: 'Giacca rinforzata ×2', n: '' },
  ],
  nota:
    '',
};

/* Punti esperienza: soglie standard di Saga Edition — 1.000 / 3.000 / 6.000 / 10.000 */
export const esperienza = {
  livelloAttuale: 4,
  livelloProssimo: 5,
  attuali: 6000,
  soglia: 10000,
  nota:
    '',
};

export const progressione = [
  {
    t: 'Talento Jedi',
    m: 'Liv. 5',
    p: 'Dall\'albero Lightsaber Combat: <b>Weapon Specialization (spade laser)</b>, +2 ai danni, che richiede Weapon Focus (già preso), oppure <b>Lightsaber Defense</b>, +1 di deviazione ai Riflessi con la spada accesa, prendibile fino a tre volte. Il BAB sale a +5.',
  },
  {
    t: 'Talento generale + talento bonus Jedi',
    m: 'Liv. 6',
    p: 'Per il generale, <b>Skill Training</b> su Percezione resta il candidato naturale: varrebbe +9, con ottima sinergia con Heightened Awareness. Per il bonus Jedi, <b>Martial Arts II</b> per proseguire sulla strada Matukai, oppure <b>Rapid Strike</b> (−2 al colpire per +1 dado di danno).',
  },
  {
    t: 'Abilità Focalizzata — rimandare',
    m: 'Non prima del liv. 8',
    p: 'Con la regola della casa il talento su Usare la Forza adesso vale <b>+2</b>: un talento speso per poco. Diventa un investimento sensato dal <b>liv. 8</b> in su (+3), e nel frattempo conviene spingere sull\'accuratezza in mischia e sulla Difesa Riflessi.',
  },
];

/* Stato a fine sessione: è il punto di partenza della scheda interattiva.
   Il browser salva da solo ogni modifica fatta sulla pagina; se cambi questi
   valori, al caricamento successivo prevalgono sul salvataggio locale. */
export const statoIniziale = {
  hp: 29,
  condizione: 1, // penalità del condition track: 0, 1, 2, 5, 10 oppure 99 (KO)
  secondWindUsato: true,
};
