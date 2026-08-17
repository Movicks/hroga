import { Suspense } from 'react';
import { MonthlyDuesForm } from './component/MonthlyDuesForm';

export default function MonthlyDuesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            <p className="text-gray-600">Loading payment page...</p>
          </div>
        </div>
      }
    >
      <MonthlyDuesForm />
    </Suspense>
  );
}
