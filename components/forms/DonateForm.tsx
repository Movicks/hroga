'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, Banknote, CheckCircle2 } from 'lucide-react';

export type VerifiedDonation = {
  reference: string;
  fullName: string;
  email: string;
  amount: number;
  currency: string;
  purpose?: string;
  message?: string;
  anonymous: boolean;
  status: 'pending' | 'success' | 'failed';
  paidAt?: string;
};

type DonationState = {
  fullName: string;
  email: string;
  amount: number;
  purpose: string;
  message: string;
  anonymous: boolean;
};

type DonateFormProps = {
  apiBaseUrl?: string;
  initialAmount: number;
  onAmountChange: (amount: number) => void;
  error: string | null;
  successMessage: string | null;
  verifiedDonation: VerifiedDonation | null;
  isVerifying: boolean;
};

const initialForm: DonationState = {
  fullName: '',
  email: '',
  amount: 25000,
  purpose: 'Alumni Impact Fund',
  message: '',
  anonymous: false,
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DonateForm({
  apiBaseUrl,
  initialAmount,
  onAmountChange,
  error,
  successMessage,
  verifiedDonation,
  isVerifying,
}: DonateFormProps) {
  const [form, setForm] = useState<DonationState>({
    ...initialForm,
    amount: initialAmount,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setForm((current) => {
      if (current.amount === initialAmount) {
        return current;
      }

      return {
        ...current,
        amount: initialAmount,
      };
    });
  }, [initialAmount]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!apiBaseUrl) {
      setSubmitError(
        'The donation service is not configured. Add NEXT_PUBLIC_API_BASE_URL to your env.',
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/donations/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to start the donation.');
      }

      window.location.href = data.authorizationUrl;
    } catch (submitError) {
      setSubmitError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to start the donation.',
      );
      setIsSubmitting(false);
    }
  };

  const displayedError = submitError || error;

  return (
    <div className="relative">
      <div className="rounded-[1rem] border border-slate-200 bg-white p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              Donate now
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--darkNavy)]">
              Complete your gift in a few steps
            </h2>
          </div>
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Banknote className="h-5 w-5" />
          </div>
        </div>

        {(displayedError || successMessage || isVerifying) && (
          <div className="mb-6 space-y-3">
            {isVerifying && (
              <div className="rounded-2xl border border-primary/20 bg-primary/8 px-4 py-3 text-sm text-primary">
                Verifying your Paystack payment reference...
              </div>
            )}

            {successMessage && verifiedDonation && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold">{successMessage}</p>
                    <p>
                      Reference: <span className="font-medium">{verifiedDonation.reference}</span>
                    </p>
                    <p>
                      Amount:{' '}
                      <span className="font-medium">
                        {formatCurrency(verifiedDonation.amount)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {displayedError && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {displayedError}
              </div>
            )}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Full name</span>
              <input
                type="text"
                value={form.fullName}
                onChange={(event) =>
                  setForm((current) => ({ ...current, fullName: event.target.value }))
                }
                autoComplete="name"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="Enter your full name"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Email address</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                autoComplete="email"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Amount (NGN)</span>
              <input
                type="number"
                min={1000}
                step={500}
                value={form.amount}
                onChange={(event) => {
                  const amount = Number(event.target.value || 0);
                  setForm((current) => ({
                    ...current,
                    amount,
                  }));
                  onAmountChange(amount);
                }}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Purpose</span>
              <input
                type="text"
                value={form.purpose}
                onChange={(event) =>
                  setForm((current) => ({ ...current, purpose: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="Scholarships, projects, events, welfare..."
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Message</span>
            <textarea
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder="Share a dedication, campaign note, or why you are giving."
            />
          </label>

          <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.anonymous}
              onChange={(event) =>
                setForm((current) => ({ ...current, anonymous: event.target.checked }))
              }
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            Keep my donation anonymous on acknowledgements.
          </label>

          <button
            type="submit"
            disabled={isSubmitting || isVerifying}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Redirecting to Paystack...' : 'Continue to secure payment'}
            {!isSubmitting && <ArrowRight className="h-5 w-5" />}
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
          Payments are processed securely via Paystack. You&apos;ll return here automatically
          after payment verification.
        </div>
      </div>
    </div>
  );
}
