'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { loginSchema } from '@/types/snippet';
import { validateData } from '@/lib/validation';
import SocialLogin from '@/components/SocialLogin';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleLogin() {
        // Clear previous errors
        setError('');
        
        // Validate form data using Zod
        const formData = { email, password };
        const validation = validateData(loginSchema, formData);

        if (!validation.success) {
            setError(validation.error);
            return;
        }

        setLoading(true);
        
        try {
            // Check if Supabase is properly configured
            if (!supabase) {
                throw new Error('Supabase client is not configured. Please check your environment variables.');
            }

            // Check if environment variables are set
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
                throw new Error('Supabase environment variables are not configured. Please create a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
            }

            console.log('Attempting login with:', { email, password: '***' });
            console.log('Supabase URL configured:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
            console.log('Supabase key configured:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
            
            const { data, error } = await supabase.auth.signInWithPassword({ 
                email: validation.data.email, 
                password: validation.data.password 
            });
            
            console.log('Login response:', { data, error });
            
            if (error) {
                console.error('Login error:', error);
                setError(error.message);
            } else {
                console.log('Login successful:', data);
                // Debug: Check cookies
                console.log('Cookies after login:', document.cookie);
                
                // Add a small delay to ensure cookies are set
                setTimeout(() => {
                    console.log('Redirecting to dashboard...');
                    router.push('/dashboard');
                }, 100);
            }
        } catch (err) {
            console.error('Unexpected error during login:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-200 dark:from-gray-900 dark:to-gray-800 theme-transition">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-sm theme-transition">
                <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-400">Login</h1>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded">
                        {error}
                    </div>
                )}
                
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={loading}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <SocialLogin 
                    onSuccess={() => router.push('/dashboard')}
                    onError={setError}
                    loading={loading}
                    setLoading={setLoading}
                />
                
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don&apos;t have an account?{' '}
                        <a href="/signup" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
