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
  const [showPassword, setShowPassword] = useState(false);

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
      const createRes = await signIn.create({ identifier: email, password });
      console.log('signIn.create =>', createRes);

      let signedIn = false;
      if (createRes?.status === 'complete' || createRes?.createdSessionId) {
        signedIn = true;
      }

      // Some SDKs require attemptFirstFactor with password param
      if (!signedIn && typeof signIn.attemptFirstFactor === 'function') {
        try {
          const attempt = await signIn.attemptFirstFactor({ strategy: 'password', password });
          console.log('signIn.attemptFirstFactor =>', attempt);
          if (attempt?.status === 'complete' || attempt?.createdSessionId) signedIn = true;
        } catch (err) {
          console.warn('attemptFirstFactor failed', err);
        }
      }

      if (!signedIn) {
        setError('Sign-in requires additional verification. Check your email.');
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
        setLoading(false);
        return;
      }

      const token = await getToken();
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
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="hidden h-screen bg-cover bg-no-repeat lg:block lg:w-2/3"
          style={{ backgroundImage: "url('/assets/Images/signIn.jpg')" }}
        />
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <p className="mt-3 text-black text-2xl font-bold sm:text-3xl">Sign in to your account</p>
            </div>
            <div className="mt-8">
              <form method="post" noValidate className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm text-black">Email address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-black">Password</label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-5 py-3 pr-12 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-blue-600"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <p className="mt-6 text-sm text-center text-black">
                Don't have an account yet?{' '}
                <Link href="/auth/sign-up" className="text-blue-500 focus:outline-none focus:underline hover:underline">
                  Sign up
                </Link>
              </p>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
