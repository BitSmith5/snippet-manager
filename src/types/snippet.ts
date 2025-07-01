import { z } from 'zod';

// Base snippet schema
export const snippetSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  content: z.string().min(1, 'Content is required'),
  language: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
});

// Schema for creating a new snippet
export const createSnippetSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  content: z.string().min(1, 'Content is required'),
  language: z.string().optional(),
});

// Schema for updating a snippet
export const updateSnippetSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  language: z.string().optional(),
});

// Schema for user authentication
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Schema for user registration
export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// TypeScript types inferred from Zod schemas
export type Snippet = z.infer<typeof snippetSchema>;
export type CreateSnippetData = z.infer<typeof createSnippetSchema>;
export type UpdateSnippetData = z.infer<typeof updateSnippetSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>; 