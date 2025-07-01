import { z } from 'zod';

// Helper function to format Zod validation errors for display
export function formatValidationErrors(error: z.ZodError): string[] {
  return error.errors.map(err => {
    const field = err.path.join('.');
    return `${field ? `${field}: ` : ''}${err.message}`;
  });
}

// Helper function to get the first validation error message
export function getFirstValidationError(error: z.ZodError): string {
  const errors = formatValidationErrors(error);
  return errors[0] || 'Validation failed';
}

// Helper function to validate data and return success/error result
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: getFirstValidationError(error) };
    }
    return { success: false, error: 'Validation failed' };
  }
}

// Helper function to safely parse data without throwing
export function safeParse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  return result;
} 