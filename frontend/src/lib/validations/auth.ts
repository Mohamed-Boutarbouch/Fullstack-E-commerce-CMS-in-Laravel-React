import * as z from 'zod';

export const LogInSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(100),
  remember: z.boolean(),
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: 'Your name must be at least 3 characters long',
      })
      .max(100),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100),
    password_confirmation: z
      .string()
      .min(8, {
        message: 'Password confirmation must be at least 8 characters long',
      })
      .max(100),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation must match the password',
    path: ['password_confirmation'],
  });

export type RegisterSchemaResult = z.infer<typeof RegisterSchema>;

export const VerifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'Verification code must be 6 characters long',
    })
    .max(6),
});

export const CheckEmailSchema = z.object({
  email: LogInSchema.shape.email,
});

export const ResetPasswordSchema = z
  .object({
    password: LogInSchema.shape.password,
    password_confirmation: LogInSchema.shape.password,
    code: VerifyEmailSchema.shape.code,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

export const UserPrivateMetadataSchema = z.object({
  role: z.enum(['user', 'admin']),
  stripePriceId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.string().optional().nullable(),
});
