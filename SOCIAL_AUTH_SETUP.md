# Social Authentication Setup Guide

This guide will help you configure Google and Facebook OAuth providers in Supabase to enable social login functionality in your snippet manager application.

## Prerequisites

- A Supabase project
- Google Cloud Console access
- Facebook Developer account

## Google OAuth Setup

### 1. Google Cloud Console Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application" as the application type
   - Add authorized redirect URIs:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for local development)
5. Note down your **Client ID** and **Client Secret**

### 2. Supabase Configuration

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" > "Providers"
3. Find "Google" in the list and click "Edit"
4. Enable Google provider
5. Enter your Google Client ID and Client Secret
6. Save the configuration

## Facebook OAuth Setup

### 1. Facebook Developer Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select an existing one
3. Add Facebook Login product to your app
4. Configure Facebook Login:
   - Go to "Facebook Login" > "Settings"
   - Add Valid OAuth Redirect URIs:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for local development)
5. Note down your **App ID** and **App Secret**

### 2. Supabase Configuration

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" > "Providers"
3. Find "Facebook" in the list and click "Edit"
4. Enable Facebook provider
5. Enter your Facebook App ID and App Secret
6. Save the configuration

## Environment Variables

Make sure your environment variables are properly configured in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing Social Login

1. Start your development server: `npm run dev`
2. Navigate to `/login` or `/signup`
3. Click on "Continue with Google" or "Continue with Facebook"
4. Complete the OAuth flow
5. You should be redirected to the dashboard upon successful authentication

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**:
   - Ensure the redirect URIs in your OAuth provider settings match exactly with Supabase's callback URL
   - Check for trailing slashes or protocol mismatches

2. **"Provider not enabled" error**:
   - Verify that the provider is enabled in Supabase dashboard
   - Check that Client ID/Secret are correctly entered

3. **"App not verified" (Facebook)**:
   - For development, you can add test users in Facebook app settings
   - For production, you'll need to submit your app for review

4. **CORS errors**:
   - Ensure your domain is added to the authorized domains in your OAuth provider settings

### Debug Steps

1. Check browser console for error messages
2. Verify Supabase logs in the dashboard
3. Test OAuth flow in incognito mode
4. Ensure all environment variables are loaded correctly

## Security Considerations

1. **Client Secrets**: Never expose client secrets in client-side code
2. **Redirect URIs**: Use HTTPS in production and limit redirect URIs to your domains
3. **App Verification**: Submit your Facebook app for verification before production use
4. **Rate Limiting**: Implement rate limiting to prevent abuse

## Production Deployment

1. Update redirect URIs to use your production domain
2. Ensure HTTPS is enabled
3. Configure proper CORS settings
4. Test the complete authentication flow
5. Monitor authentication logs for any issues

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/) 