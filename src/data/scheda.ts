/* =========================================================
   VRAK THAR — dati di scheda
   Unico posto da toccare quando il personaggio sale di livello.
   I campi di testo accettano HTML inline (<b>, <br>).
   ========================================================= */

export const profilo = {
  nome: 'Vrak',
  cognome: 'Thar',
  sottotitolo: 'Zabrak · Tradizione Matukai · Jedi 3',
  ritratto: '/vrak-thar.jpg',
  ritrattoAlt:
    'Ritratto di Vrak Thar, guerriero Zabrak dal cranio rasato con corna e tatuaggi tribali neri sul volto',
  chip: [
    { l: 'BAB', v: '+3' },
    { l: 'Velocità', v: '6 caselle' },
    { l: 'Taglia', v: 'Media' },
    { l: 'Lingue', v: 'Basic, Zabrak' },
  ],
  tratti: {
    etichetta: 'Tratti Zabrak',
    testo:
      '<b>Heightened Awareness</b> — puoi ritirare qualsiasi prova di Percezione, ma devi accettare il secondo risultato anche se peggiore.<br><b>Superior Defenses</b> — +1 di specie a tutte le Difese, già incluso nei valori qui sotto.',
  },
};

export const caratteristiche = [
  { l: 'For', s: 15, m: '+2' },
  { l: 'Des', s: 10, m: '+0' },
  { l: 'Cos', s: 15, m: '+2' },
  { l: 'Int', s: 10, m: '+0' },
  { l: 'Sag', s: 12, m: '+1' },
  { l: 'Car', s: 14, m: '+2' },
];

/* base = valore a condizione normale: il condition track lo ricalcola da solo */
export const difese = [
  { l: 'Riflessi', base: 15, soglia: false },
  { l: 'Tempra', base: 17, soglia: false },
  { l: 'Volontà', base: 15, soglia: false },
  { l: 'Soglia danno', base: 17, soglia: true },
];

export const risorse = {
  hpMax: 47,
  fpMax: 6,
  secondWind: 15,
  hpNota:
    'Second Wind recupera <b>15 PF</b>: un quarto dei PF totali o il punteggio di Costituzione, il maggiore dei due — qui vince Costituzione. Azione veloce, <b>1 volta al giorno</b> e mai più di una volta nello stesso incontro.',
  fpTitolo: 'Punti Forza — 5 + metà livello',
  fpNota:
    'Spendine uno per aggiungere <b>1d6</b> a una prova, o per attivare capacità specifiche. Si ricaricano interamente ad ogni passaggio di livello: i residui vanno persi.',
  formule:
    'RIF 10 +3 livello +0 Des +1 classe +1 specie<br>TEM 10 +3 livello +2 Cos +1 classe +1 specie<br>VOL 10 +3 livello +1 Sag +1 classe +1 specie',
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
      colpire: 6,
      danni: '2d8+3',
      note: 'Mano libera per Move Light Object o per una presa',
    },
    {
      modo: 'Due mani',
      colpire: 6,
      danni: '2d8+5',
      note: 'Bonus di Forza raddoppiato — il tuo default',
    },
    {
      modo: 'Due mani + Power Attack (−3)',
      colpire: 3,
      danni: '2d8+11',
      note: 'A due mani il malus si converte in danno raddoppiato',
    },
    {
      modo: 'Due mani + Battle Strike (CD 15)',
      colpire: 7,
      danni: '2d8+1d6+5',
      note: 'Azione veloce prima dell\'attacco',
    },
  ],
  nota:
    '<span class="lbl">Danno in mischia</span> dado dell\'arma + metà livello eroico (+1) + mod. Forza, raddoppiato impugnando a due mani.<br><span class="lbl">Turno tipo</span> Battle Strike come azione veloce, poi attacco a due mani con Power Attack calibrato sul bersaglio.',
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
      { k: 'Usare la Forza', sub: 'Car · addestrata', base: 8, addestrata: true },
      { k: 'Iniziativa', sub: 'Des · addestrata', base: 6, addestrata: true },
      { k: 'Resistenza', sub: 'Cos', base: 3, addestrata: false },
      { k: 'Saltare', sub: 'For', base: 3, addestrata: false },
    ],
    [
      { k: 'Scalare', sub: 'For', base: 3, addestrata: false },
      { k: 'Persuasione', sub: 'Car', base: 3, addestrata: false },
      { k: 'Percezione', sub: 'Sag', base: 2, addestrata: false },
      { k: 'Acrobazia', sub: 'Des', base: 1, addestrata: false },
    ],
  ],
  nota:
    'Il Jedi ottiene 2 + mod. Intelligenza abilità addestrate: con INT 10 solo due. Usare la Forza è <b>addestrata obbligatoria</b>, perché quasi tutte le sue applicazioni non funzionano senza. Percezione addestrata varrebbe +7 e avrebbe ottima sinergia con Heightened Awareness: candidata naturale per Skill Training a un livello futuro.',
  alert:
    '<b>Regola della casa — Abilità Focalizzata</b><br>Su <b>Usare la Forza</b> il talento non dà +5 secco ma un bonus che scala col livello: <b>+1</b> dal liv. 1 · <b>+2</b> dal liv. 4 · <b>+3</b> dal liv. 8 · <b>+4</b> dal liv. 12 · <b>+5</b> dal liv. 16 · <b>+6</b> al liv. 20. Su tutte le altre abilità resta il +5 fisso da manuale.<br>Il <b>+8</b> attuale non è toccato dalla regola: quel +5 è il bonus da abilità addestrata, non il talento.',
};

export const inventario = {
  voci: [
    { v: 'Spada laser', n: 'assemblata da lui, non sintonizzata' },
    { v: 'Nessuna armatura', n: 'dottrina Matukai' },
    { v: 'Crediti', n: '3d4 × 100 iniziali — da tirare' },
    { v: 'Slot libero', n: '______________', vuoto: true },
  ],
  nota:
    'La lama che porta è un assemblaggio di componenti comprati al mercato: funziona, ma non è costruita secondo la procedura e non è sintonizzata, quindi non dà nessun bonus.<br>Dal <b>7° livello eroico</b> potrai costruirne una tua come si deve: 1.500 crediti di componenti, 24 ore ininterrotte e una prova di Usare la Forza CD 20. Una volta costruita, spendi un Punto Forza per sintonizzarla e ottieni <b>+1 a tutti i tiri per colpire</b> con quell\'arma.',
};

export const progressione = [
  {
    t: 'Aumento di caratteristica',
    m: 'Liv. 4',
    p: '+1 a due punteggi. Metti <b>FOR 15→16</b> e <b>COS 15→16</b>: entrambi superano una soglia e diventano +3. Guadagni +1 al colpire, +2 ai danni a due mani, +1 PF per livello, +1 Tempra e +1 Soglia di Danno.',
  },
  {
    t: 'Talento bonus Jedi',
    m: 'Liv. 4',
    p: 'Candidati: <b>Rapid Strike</b> (−2 al colpire per +1 dado di danno), <b>Martial Arts I</b> (+1 Riflessi e danno senz\'armi migliorato, molto Matukai), <b>Skill Training</b> per Percezione.',
  },
  {
    t: 'Abilità Focalizzata — rimandare',
    m: 'Non prima del liv. 8',
    p: 'Con la regola della casa il talento su Usare la Forza vale <b>+1</b> ora e <b>+2</b> al liv. 4: un talento speso per quasi nulla. Diventa un investimento sensato dal <b>liv. 8</b> in su (+3), e nel frattempo conviene spingere sull\'accuratezza in mischia e sulla Difesa Riflessi.',
  },
];
