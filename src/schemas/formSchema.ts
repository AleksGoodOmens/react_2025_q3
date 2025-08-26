import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string('Name should be a string')
      .regex(/^[A-Z]/, 'should start with capital letter')
      .min(2, 'The length of the name should be more than 1'),
    age: z
      .string()
      .transform(Number)
      .refine((val) => !isNaN(Number(val)), { message: 'Age must be a number' })
      .refine((val) => val >= 0, { message: 'Age cannot be negative' })
      .refine((val) => val >= 21, {
        message: 'you need to be minimum 21',
      })
      .transform(String),
    email: z.email('Please provide correct email'),
    password: z
      .string()
      .regex(/[a-z]/, 'password should contain at least 1 lowercase letter')
      .regex(/[A-Z]/, 'password should contain at least one uppercase letter')
      .regex(/[0-9]/, 'password should contain at least one number')
      .regex(
        /[!@#$%^&*]/,
        'password should contain any of special characters [!@#$%^&*]'
      )
      .min(8, 'password should be at least 8 characters')
      .max(16, 'password cant be longer that 16'),
    confirmPassword: z.string(),
    gender: z.literal(['male', 'female'], 'we accept only two genders!'),
    tc: z.literal<boolean>(true, 'you need to accept our TC'),
    country: z.string().min(2, 'please select the country'),
    file: z
      .instanceof(FileList)
      .refine((file: FileList) => file?.length === 1, 'File is required')
      .refine(
        (file: FileList) => ['image/png', 'image/jpeg'].includes(file[0]?.type),
        'Only PNG/JPEG allowed'
      )
      .refine(
        (file: FileList) => file[0]?.size <= 2 * 1024 * 1024,
        'File size must be <= 2MB'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormSchemaType = z.infer<typeof formSchema>;
