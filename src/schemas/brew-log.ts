import { z } from 'zod';

export const brewLogSchema = z.object({
  brewed_at: z.string().min(1, 'Brew date is required'),
  water_temp: z.number().int().min(0).max(100).optional(),
  water_type: z.string().optional(),
  leaf_amount_g: z.number().min(0).optional(),
  steeping_details: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  review: z.string().optional(),
});

export type BrewLogSchemaType = z.infer<typeof brewLogSchema>;
