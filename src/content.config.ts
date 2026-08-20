import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* Il diario: una voce = un file md in src/content/diario/.
   Ordinamento per numero di sessione decrescente. */
const diario = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/diario' }),
  schema: z.object({
    sessione: z.number(),
    data: z.string(),
    titolo: z.string(),
  }),
});

/* Il codex: una voce = un file md in src/content/codex/.
   Le categorie dei filtri si ricavano dalle voci, non sono scritte a mano. */
const codex = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/codex' }),
  schema: z.object({
    titolo: z.string(),
    categoria: z.enum(['tradizioni', 'fazioni', 'luoghi', 'persone', 'concetti']),
    /* false = voce basata su dicerie, da confermare in gioco */
    verificata: z.boolean().default(true),
    ordine: z.number().default(100),
  }),
});

/* Pagine lunghe in prosa (per ora: il background). */
const pagine = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pagine' }),
  schema: z.object({
    titolo: z.string(),
    sottotitolo: z.string().optional(),
    nota: z.string().optional(),
    chip: z.array(z.object({ l: z.string(), v: z.string() })).default([]),
    intro: z.string().optional(),
    ganci: z
      .array(z.object({ t: z.string(), m: z.string(), p: z.string() }))
      .default([]),
  }),
});

export const collections = { diario, codex, pagine };
