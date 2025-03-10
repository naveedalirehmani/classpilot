import { z } from "zod";

// Sign In Schema
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

// Sign Up Schema
export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  fullName: z.string().min(1, "Full name is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  organization: z.string().min(1, "Organization is required"),
  profession: z.string().min(1, "Profession is required"),
  referral: z.string().min(1, "Please tell us how you heard about us"),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;


export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

