'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSignIn, useAuth } from '@clerk/nextjs';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

export default function SignInPage() {
  const router = useRouter();
  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const { getToken } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!signInLoaded || !signIn) {
      setError('Auth not ready');
      return;
    }

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      // create a signIn instance
      const createRes = await signIn.create({ identifier: email, password });
      console.log('signIn.create =>', createRes);

      let signedIn = false;

      // If SDK returns a session or status complete
      if (createRes?.status === 'complete' || createRes?.createdSessionId) {
        signedIn = true;
      }

      // If attemptFirstFactor is available, call it
      if (!signedIn && typeof signIn.attemptFirstFactor === 'function') {
        const attempt = await signIn.attemptFirstFactor({ strategy: 'password' });
        console.log('signIn.attemptFirstFactor =>', attempt);
        if (attempt?.status === 'complete' || attempt?.createdSessionId) signedIn = true;
      }

      if (!signedIn) {
        setError('Sign-in requires additional verification (email/OTP). Please complete verification.');
        setLoading(false);
        // Optionally redirect to verify page
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
        return;
      }

      // we have a session -> get token and call backend
      const token = await getToken();
      console.log('[DEBUG] got token length', token?.length);

      const resp = await fetch(`${API_BASE}/api/profile/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!resp.ok) {
        const json = await resp.json().catch(() => ({}));
        setError('Backend error: ' + (json?.error || resp.status));
        setLoading(false);
        return;
      }

      router.push('/');
    } catch (err: any) {
      console.error('sign-in error', err);
      setError(err?.errors?.[0]?.message || err?.message || 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <button type="submit" disabled={loading} className="w-full px-4 py-2 bg-blue-600 text-white rounded">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <p className="mt-4 text-sm text-center">
          Don&#x27;t have an account yet?{" "}
          <Link
            href="sign-up"
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
