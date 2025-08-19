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

export const DetailedCountriesSchema = z.object({
  name: z
    .object({
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
    })
    .optional(),

  independent: z.boolean(),
  status: z.string(),

  idd: z.object({ root: z.string(), suffixes: z.array(z.string()) }),
  capital: z.array(z.string()),
  altSpellings: z.array(z.string()),
  region: z.string(),
  subregion: z.string().optional(),
  languages: z.record(z.string(), z.string()),
  borders: z.array(z.string()).optional(),
  currencies: z
    .record(
      z.string(),
      z.object({
        name: z.string(),
        symbol: z.string(),
      })
    )
    .optional(),
  area: z.number(),
  flag: z.string(),
  maps: z.object({ googleMaps: z.string(), openStreetMaps: z.string() }),
  population: z.number(),
  timezones: z.array(z.string()),
  flags: z.object({
    png: z.string(),
    svg: z.string(),
    alt: z.string().optional(),
  }),
  coatOfArms: z.object({
    png: z.string().optional(),
    svg: z.string().optional(),
  }),
  postalCode: z.object({
    format: z.string().nullable(),
    regex: z.string().nullable(),
  }),
});

export type ICountry = z.infer<typeof CountrySchema>;
export type IDetailedCountry = z.infer<typeof DetailedCountriesSchema>;
export type IGetCountries = z.infer<typeof CountriesSchema>;

export interface IGetCountriesResponse {
  error?: string;
  countries: ICountry[];
}
