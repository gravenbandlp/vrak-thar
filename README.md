# Vrak Thar — sito di gioco

Sito statico per il personaggio **Vrak Thar** (Star Wars Saga Edition).
Astro + contenuti in markdown, build statica, deploy su Cloudflare Pages a ogni push su GitHub.

## Sviluppo locale

```bash
npm install       # solo la prima volta
npm run dev       # http://localhost:4321
npm run build     # build statica in dist/
npm run preview   # anteprima della build
```

Richiede Node 22.12 o superiore (vedi `.nvmrc`).

## Dove sta cosa

| Cosa vuoi cambiare | File |
| --- | --- |
| Una voce di diario | `src/content/diario/NN-slug.md` |
| Una voce di codex | `src/content/codex/slug.md` |
| Il background | `src/content/pagine/background.md` |
| Numeri e testi della scheda | `src/data/scheda.ts` |
| Grafica, colori, componenti | `src/styles/global.css` |
| Struttura comune e tab | `src/layouts/Layout.astro` |
| Campi ammessi nel frontmatter | `src/content.config.ts` |
| Ritratto | `public/vrak-thar.jpg` |
| Suoni dell'interfaccia | `public/ui-sound.js` |

Il CSS è **lo stesso foglio di stile del prototipo HTML**, importato una volta sola dal layout:
niente stili duplicati per pagina.

### Aggiungere una sessione di diario

Crea `src/content/diario/02-qualcosa.md`:

```markdown
---
sessione: 2
data: 12 settembre 2026
titolo: Il carico su Taris
---

Testo in markdown, prima persona.
```

L'ordinamento è automatico: sessione decrescente.

### Aggiungere una voce di codex

Crea `src/content/codex/nome-voce.md`:

```markdown
---
titolo: Nome voce
categoria: luoghi      # tradizioni | fazioni | luoghi | persone | concetti
verificata: false      # true se confermata in gioco
ordine: 160            # posizione nella griglia
---

Testo in markdown.
```

I pulsanti-filtro si generano dalle categorie effettivamente presenti. Per introdurne una nuova,
aggiungila all'enum in `src/content.config.ts` e all'elenco `ETICHETTE` in `src/pages/codex.astro`.

### Immagini degli elementi di rilievo

I quattro riquadri in fondo alla pagina Background mostrano un **segnaposto** finché non c'è
l'immagine. Metti il file in `public/rilievi/` e togli il commento al campo `img` della voce in
`src/content/pagine/background.md`:

```yaml
  - t: Sahra Thar
    m: Legame primario
    p: >-
      ...
    img: /rilievi/sahra-thar.webp
    alt: Ritratto di Sahra Thar
```

Il percorso atteso è scritto dentro il segnaposto stesso. Il riquadro è **3:2** con ritaglio
`object-fit:cover` allineato in alto: tieni il soggetto nella metà superiore dell'immagine. Senza `alt` viene usato il titolo della voce.

Le immagini vanno ridotte prima di entrare nel repo. `sharp` è già disponibile come dipendenza
di Astro, quindi basta:

```bash
node -e "require('sharp')('originale.png').resize({width:1100}).webp({quality:78,effort:6}).toFile('public/rilievi/nome-voce.webp')"
```

1100px di larghezza copre il doppio della dimensione a cui la scheda viene mostrata: un PNG da
1,7 MB scende sotto i 60 KB.

## Deploy su Cloudflare Pages

1. Crea un repo su GitHub e fai push di questa cartella.
2. Cloudflare Dashboard → **Workers & Pages** → *Create* → *Pages* → *Connect to Git* → scegli il repo.
3. Impostazioni di build:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variable**: `NODE_VERSION` = `22.12.0`
4. Salva. Da lì in poi ogni push sul branch principale ricostruisce e pubblica il sito;
   ogni pull request ottiene una preview con URL proprio.

Dopo il primo deploy, aggiorna `site` in `astro.config.mjs` con l'URL definitivo.

---

Star Wars Roleplaying Game — Saga Edition · Core Rulebook · Knights of the Old Republic Campaign Guide.
Sito personale di gioco, nessuna finalità commerciale.
