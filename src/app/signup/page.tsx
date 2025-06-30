'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Basic validation
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        
        if (!email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }
        
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        
        try {
            // Check if Supabase is properly configured
            if (!supabase) {
                throw new Error('Supabase client is not configured. Please check your environment variables.');
            }

            console.log('Attempting signup with:', { email, password: '***' });
            
            const { data, error } = await supabase.auth.signUp({ 
                email, 
                password 
            });
            
            console.log('Signup response:', { data, error });
            
            if (error) {
                console.error('Signup error:', error);
                setError(error.message);
            } else {
                console.log('Signup successful:', data);
                setSuccess(true);
                setTimeout(() => router.push('/dashboard'), 1000);
            }
        } catch (err) {
            console.error('Unexpected error during signup:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-200">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">Sign Up</h1>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        Sign up successful! Redirecting...
                    </div>
                )}
                
                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-300"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-300"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="new-password"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-300"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="new-password"
                            disabled={loading}
                            required
                        />
                    </div>
                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-indigo-600 hover:text-indigo-800">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
