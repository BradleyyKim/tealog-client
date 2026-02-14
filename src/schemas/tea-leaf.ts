import { z } from 'zod';

export const teaLeafSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().optional(),
  brand_origin: z.string().optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  in_stock: z.boolean().optional(),
  tasting_notes: z.string().optional(),
});

export type TeaLeafSchemaType = z.infer<typeof teaLeafSchema>;
