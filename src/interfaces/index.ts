import { z } from 'zod';

export const CountrySchema = z.object({
  flags: z.object({
    png: z.string(),
    svg: z.string(),
    alt: z.string().optional(),
  }),
  name: z.object({
    common: z.string(),
    official: z.string(),
    nativeName: z
      .record(
        z.string(),
        z.object({
          official: z.string(),
          common: z.string(),
        })
      )
      .optional(),
  }),
  capital: z.array(z.string()).optional(),
  area: z.number(),
});

export const CountriesSchema = z.object({
  countries: z.array(CountrySchema),
  search: z.string(),
  next: z.boolean(),
  prev: z.boolean(),
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  error: z.string().optional(),
});

export type ICountry = z.infer<typeof CountrySchema>;
export type IGetCountries = z.infer<typeof CountriesSchema>;

export interface IGetCountriesResponse {
  error?: string;
  countries: ICountry[] | [];
}
