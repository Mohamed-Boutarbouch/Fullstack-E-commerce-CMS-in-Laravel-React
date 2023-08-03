import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const BillboardSchema = z.object({
  image: z
    .any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      'The billboard picture must be a maximum of 5MB.',
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpeg .jpg .png and .webp formats are supported',
    ),
  // image: z
  //   .custom<FileList>()
  //   .transform((file) => file.length > 0 && file.item(0))
  //   .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
  //     message: 'The profile picture must be a maximum of 10MB.',
  //   })
  //   .refine((file) => !file || (!!file && file.type?.startsWith('image')), {
  //     message: 'Only images are allowed to be sent.',
  //   }),
  label: z.string().min(2, {
    message: 'Label must be at least 2 characters long',
  }),
});
