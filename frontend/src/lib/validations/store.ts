import { z } from 'zod';

export const StoreNameSchema = z.object({
  name: z.string().min(2, {
    message: 'Store name must be at least 2 characters long',
  }),
});
