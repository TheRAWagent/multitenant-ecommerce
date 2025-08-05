import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.^@$!%*?&])[A-Za-z\d.^@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(63, "Username must be at most 63 characters long")
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Username must start and end with a lowercase letter or number, and can only contain lowercase letters, numbers, and hyphens.")
    .refine((val) => !val.includes('--'), "Username cannot contain consecutive hyphens.")
    .transform((val) => val.toLowerCase())
});

export const verifyAccountSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(63, "Username must be at most 63 characters long")
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Username must start and end with a lowercase letter or number, and can only contain lowercase letters, numbers, and hyphens.")
    .refine((val) => !val.includes('--'), "Username cannot contain consecutive hyphens.")
    .transform((val) => val.toLowerCase()),
  code: z.string().length(6, "Verification code must 6 characters long")
})

export const loginSchema = z.object({
  username: z.string().nonempty("Please enter username"),
  password: z.string().nonempty("Please enter password")
})
