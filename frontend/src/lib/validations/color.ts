import { z } from 'zod';

export const ColorSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters long',
  }),
  value: z.string().min(7, {
    message: 'Name must be at least 7 characters long',
  }),
});
