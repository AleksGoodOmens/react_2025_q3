import { z } from 'zod';

const NativeNameSchema = z.record(
  z.string(),
  z.object({
    official: z.string(),
    common: z.string(),
  })
);

export const CountrySchema = z.object({
  flags: z.object({
    png: z.string(),
    svg: z.string(),
    alt: z.string().optional(),
  }),
  name: z.object({
    common: z.string(),
    official: z.string(),
    nativeName: NativeNameSchema.optional(),
  }),
  capital: z.array(z.string()).optional(),
  area: z.number(),
});

export type ICountry = z.infer<typeof CountrySchema>;

export interface IGetCountriesResponse {
  error?: string;
  countries: ICountry[] | [];
}
