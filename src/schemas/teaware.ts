import { z } from 'zod';

export const teawareSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().optional(),
  material: z.string().optional(),
  volume_ml: z.number().int().positive().optional(),
  status: z.string().optional(),
  is_favorite: z.boolean().optional(),
});

export type TeawareSchemaType = z.infer<typeof teawareSchema>;
