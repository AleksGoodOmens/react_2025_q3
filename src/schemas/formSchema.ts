import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, 'Name must start with an uppercase letter'),
    age: z
      .string()
      .refine((val) => !isNaN(Number(val)), { message: 'Age must be a number' })
      .transform(Number)
      .refine((val) => val >= 0, { message: 'Age cannot be negative' })
      .refine((val) => val >= 18, {
        message: 'age should be greater or equal to 18',
      }),
    email: z.email('Invalid email'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[0-9]/, 'Must contain a number')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[a-z]/, 'Must contain a lowercase letter')
      .regex(/[^a-zA-Z0-9]/, 'Must contain a special character'),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female']),
    tc: z.literal('on', {
      message: 'You must accept T&C',
    }),
    file: z
      .any()
      .refine((file: FileList) => file?.length === 1, 'File is required')
      .refine(
        (file: FileList) => ['image/png', 'image/jpeg'].includes(file[0]?.type),
        'Only PNG/JPEG allowed'
      )
      .refine(
        (file: FileList) => file[0]?.size <= 2 * 1024 * 1024,
        'File size must be <= 2MB'
      ),
    country: z.string().min(1, 'Country is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
