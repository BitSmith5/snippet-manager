'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleLogin() {
        // Clear previous errors
        setError('');
        
        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        
        try {
            // Check if Supabase is properly configured
            if (!supabase) {
                throw new Error('Supabase client is not configured. Please check your environment variables.');
            }

            console.log('Attempting login with:', { email, password: '***' });
            
            const { data, error } = await supabase.auth.signInWithPassword({ 
                email, 
                password 
            });
            
            console.log('Login response:', { data, error });
            
            if (error) {
                console.error('Login error:', error);
                setError(error.message);
            } else {
                console.log('Login successful:', data);
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Unexpected error during login:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-200">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">Login</h1>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={loading}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-300"
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
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-indigo-600 hover:text-indigo-800">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
