import { z } from 'zod';

export const DataSchema = z.object({
  cement_co2: z.number().optional(),
  cumulative_cement_co2: z.number().optional(),
  population: z.number().optional(),
  year: z.number(),
});

export const CountrySchema = z.object({
  data: z.array(DataSchema),
  iso_code: z.string().min(3).optional(),
});

export const CountriesDataSchema = z.record(z.string(), CountrySchema);
export type CountriesData = z.infer<typeof CountriesDataSchema>;
