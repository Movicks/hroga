'use client';

import { useRouter } from 'next/navigation';
import HomeTopbar from '../../components/topbars/HomeTopbar';

export default function SignupSelectionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <HomeTopbar />
      <div className="flex-1 flex items-center justify-center bg-primary/10">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center text-secondary">Sign Up</h1>
          <div className="space-y-4">
            <button
              onClick={() => router.push('/signup/alumni')}
              className="w-full bg-primary text-white p-3 rounded-md hover:bg-primary"
            >
              Sign Up as Alumni
            </button>
            <button
              onClick={() => router.push('/signup/admin')}
              className="w-full bg-secondary text-white p-3 rounded-md hover:bg-darkNavy"
            >
              Register as Admin
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push('/login')}
              className="text-primary hover:underline text-sm font-medium"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
