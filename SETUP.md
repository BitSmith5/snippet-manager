# Setup Guide

## Environment Variables Required

To fix the login issue, you need to set up Supabase environment variables. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## How to Get Supabase Credentials

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in
   - Create a new project

2. **Get Your Credentials**:
   - In your Supabase dashboard, go to Settings → API
   - Copy the "Project URL" (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - Copy the "anon public" key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

3. **Create the .env.local file**:
   - Create a file named `.env.local` in your project root
   - Add the environment variables with your actual values

4. **Restart your development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Testing the Setup

After setting up the environment variables:

1. Try to sign up with a new account
2. Check the browser console for any error messages
3. If successful, you should be redirected to the dashboard

## Troubleshooting

- **"Supabase client is not configured"**: Check that your `.env.local` file exists and has the correct variable names
- **"Invalid API key"**: Make sure you're using the "anon public" key, not the service role key
- **"Project not found"**: Verify your project URL is correct

## Security Note

The `.env.local` file is automatically ignored by Git, so your credentials won't be committed to version control. 