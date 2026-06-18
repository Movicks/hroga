'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login, clearError } from '../../redux/features/auth/authSlice';
import HomeTopbar from '../../components/topbars/HomeTopbar';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      const role = result.payload.user.role;
      router.push(role === 'admin' ? '/admin' : '/alumni');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#f0e9e4] via-[#f0e9e4] to-[#e4d5d5]">
      <HomeTopbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center text-secondary">Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-secondary">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-secondary">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary/80 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
