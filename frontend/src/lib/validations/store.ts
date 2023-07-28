import { z } from 'zod';

export const storeNameSchema = z.object({
  name: z.string().min(3, {
    message: 'Store name must be at least 3 characters long',
  }),
});
