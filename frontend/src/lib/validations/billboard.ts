import { z } from 'zod';

export const CreateBillboardSchema = z.object({
  label: z.string().min(1, { message: 'Label is required' }),
  image: z.custom<File>((file) => file instanceof File, { message: 'Image is required' }),
});

export const UpdateBillboardSchema = CreateBillboardSchema.extend({
  // image: CreateBillboardSchema.shape.image.optional(),
  image: z.string().optional(),
});

export type CreateInputs = z.infer<typeof CreateBillboardSchema>;
export type UpdateInputs = z.infer<typeof UpdateBillboardSchema>;
