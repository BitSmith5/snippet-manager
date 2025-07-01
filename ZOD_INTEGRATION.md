# Zod Integration for Snippet Manager

This document outlines the integration of Zod for runtime type validation and schema definition in the Snippet Manager application.

## Overview

Zod has been integrated to replace manual validation with a robust, type-safe validation system that provides:

- **Runtime type safety** with automatic TypeScript inference
- **Centralized schema definitions** for all data validation
- **Consistent error handling** with detailed error messages
- **Reusable validation logic** across components
- **Better developer experience** with schema-first approach

## What Changed

### Before (Manual Validation)
```typescript
// Manual validation scattered across components
if (!title.trim()) {
  setError('Title is required');
  return;
}

if (!email.includes('@')) {
  setError('Please enter a valid email address');
  return;
}
```

### After (Zod Validation)
```typescript
// Centralized schema definition
export const createSnippetSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  content: z.string().min(1, 'Content is required'),
  language: z.string().optional(),
});

// Consistent validation usage
const validation = validateData(createSnippetSchema, formData);
if (!validation.success) {
  setError(validation.error);
  return;
}
```

## Schema Definitions

### Snippet Schemas
Located in `src/types/snippet.ts`:

```typescript
// Base snippet schema for database records
export const snippetSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  content: z.string().min(1, 'Content is required'),
  language: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
});

// Schema for creating new snippets
export const createSnippetSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  content: z.string().min(1, 'Content is required'),
  language: z.string().optional(),
});

// Schema for updating snippets
export const updateSnippetSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  language: z.string().optional(),
});
```

### Authentication Schemas
```typescript
// Login validation
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Signup validation with password confirmation
export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```

## Validation Utilities

Located in `src/lib/validation.ts`:

### `validateData<T>(schema, data)`
Validates data against a schema and returns a success/error result:
```typescript
const validation = validateData(createSnippetSchema, formData);
if (validation.success) {
  // Use validation.data (type-safe)
  console.log(validation.data.title);
} else {
  // Handle validation.error (string)
  setError(validation.error);
}
```

### `formatValidationErrors(error)`
Formats Zod validation errors for display:
```typescript
const errors = formatValidationErrors(zodError);
// Returns: ["title: Title is required", "email: Please enter a valid email address"]
```

### `getFirstValidationError(error)`
Gets the first validation error message:
```typescript
const errorMessage = getFirstValidationError(zodError);
// Returns: "title: Title is required"
```

### `safeParse<T>(schema, data)`
Safely parses data without throwing exceptions:
```typescript
const result = safeParse(createSnippetSchema, formData);
if (result.success) {
  // Use result.data
} else {
  // Use result.error (ZodError object)
}
```

## Updated Components

### SnippetForm Component
- **File**: `src/components/SnippetForm.tsx`
- **Changes**: Replaced manual validation with Zod schemas
- **Benefits**: Consistent validation, better error messages, type safety

### Login Page
- **File**: `src/app/login/page.tsx`
- **Changes**: Integrated `loginSchema` validation
- **Benefits**: Email format validation, consistent error handling

### Signup Page
- **File**: `src/app/signup/page.tsx`
- **Changes**: Integrated `signupSchema` validation with password confirmation
- **Benefits**: Complex validation rules, password matching validation

## TypeScript Integration

All TypeScript types are now inferred from Zod schemas:

```typescript
// Types are automatically inferred from schemas
export type Snippet = z.infer<typeof snippetSchema>;
export type CreateSnippetData = z.infer<typeof createSnippetSchema>;
export type UpdateSnippetData = z.infer<typeof updateSnippetSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
```

This ensures that:
- Types are always in sync with validation schemas
- No manual type maintenance required
- Compile-time type safety with runtime validation

## Validation Features

### Built-in Validators
- **String validation**: `min()`, `max()`, `email()`, `url()`
- **Number validation**: `min()`, `max()`, `positive()`, `int()`
- **Date validation**: `datetime()`, `date()`
- **Custom validation**: `refine()` for complex rules

### Custom Error Messages
```typescript
z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters')
```

### Optional Fields
```typescript
z.string().optional() // Field can be undefined
z.string().nullable() // Field can be null
```

### Complex Validation
```typescript
z.object({
  password: z.string().min(6),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```

## Benefits

### 1. **Type Safety**
- Runtime validation with compile-time type inference
- Automatic TypeScript type generation
- No type drift between validation and types

### 2. **Consistency**
- Centralized validation logic
- Consistent error messages across the application
- Reusable schemas and validation functions

### 3. **Developer Experience**
- Better error messages with field-specific validation
- Schema-first approach for data modeling
- IntelliSense support for validation rules

### 4. **Maintainability**
- Single source of truth for validation rules
- Easy to update validation logic
- Clear separation of concerns

### 5. **Performance**
- Efficient validation with early termination
- Minimal runtime overhead
- Tree-shakeable validation code

## Testing the Integration

A demo component has been created at `src/components/ValidationExample.tsx` that showcases:

- All validation schemas in action
- Real-time validation testing
- Error message display
- Success/failure feedback

To test the integration:
1. Import the `ValidationExample` component
2. Add it to any page for testing
3. Try entering invalid data to see validation errors
4. Test different validation scenarios

## Migration Guide

### For New Components
1. Define Zod schemas in `src/types/snippet.ts`
2. Import schemas and validation utilities
3. Use `validateData()` for form validation
4. Handle success/error cases appropriately

### For Existing Components
1. Replace manual validation with Zod schemas
2. Update error handling to use validation utilities
3. Ensure TypeScript types are inferred from schemas
4. Test validation scenarios thoroughly

## Future Enhancements

Potential improvements for the Zod integration:

1. **Form Libraries Integration**: Integrate with React Hook Form or Formik
2. **API Validation**: Add Zod schemas for API request/response validation
3. **Database Validation**: Use Zod for database constraint validation
4. **Internationalization**: Add i18n support for validation messages
5. **Custom Validators**: Create domain-specific validation rules

## Dependencies

- **zod**: `^3.25.67` - Core validation library
- **TypeScript**: `^5` - For type inference and safety

The integration maintains backward compatibility while providing significant improvements in validation robustness and developer experience. 