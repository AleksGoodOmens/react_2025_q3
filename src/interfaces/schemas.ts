import { z } from 'zod';

export const DataSchema = z.object({
  year: z.number(),
  population: z.number().optional(),
  co2: z.number().optional(),
  co2_per_capita: z.number().optional(),
  temperature_change_from_co2: z.number().optional(),
  oil_co2: z.number().optional(),
  methane: z.number().optional(),
});

export const CountrySchema = z.object({
  data: z.array(DataSchema),
  iso_code: z.string().min(3).optional(),
});

export const CountriesDataSchema = z.record(z.string(), CountrySchema);
