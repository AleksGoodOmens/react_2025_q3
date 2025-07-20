// export interface ICountry {
//   flags: { png: string; svg: string; alt: string };
//   name: {
//     common: string;
//     official: string;
//     nativeName: { spa: { official: string; common: string } };
//   };
//   capital?: string[];
//   area: number;
// }

import { z } from 'zod';

export const CountrySchema = z.object({
  flags: z.object({
    png: z.string(),
    svg: z.string(),
    alt: z.string(),
  }),
  name: z.object({
    common: z.string(),
    official: z.string(),
    nativeName: z.object({
      spa: z.object({
        official: z.string(),
        common: z.string(),
      }),
    }),
  }),
  capital: z.array(z.string()).optional(),
  area: z.number(),
});

// Тип можно автоматически вывести из схемы
export type ICountry = z.infer<typeof CountrySchema>;
