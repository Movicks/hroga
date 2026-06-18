'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { HeartHandshake } from 'lucide-react';

import Footer from '../../components/footer/Footer';
import DonateForm, { VerifiedDonation } from '../../components/forms/DonateForm';
import HomeTopbar from '../../components/topbars/HomeTopbar';
import ItalicTitle from '@/components/reusables/ItalicTitle';

const suggestedAmounts = [5000, 10000, 25000, 50000, 100000, 200000, 500000, 1000000];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DonatePage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const status = searchParams.get('status');

  const [selectedAmount, setSelectedAmount] = useState(25000);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [verifiedDonation, setVerifiedDonation] = useState<VerifiedDonation | null>(null);
  const [handledReference, setHandledReference] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const amountLabel = useMemo(() => formatCurrency(selectedAmount || 0), [selectedAmount]);

  useEffect(() => {
    if (!reference || handledReference === reference || !apiBaseUrl) {
      return;
    }

    let cancelled = false;

    const verifyDonation = async () => {
      setIsVerifying(true);
      setError(null);

      try {
        const response = await fetch(`${apiBaseUrl}/donations/verify/${reference}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to verify your donation.');
        }

        if (!cancelled) {
          setHandledReference(reference);
          setVerifiedDonation(data.donation);
          setSuccessMessage(
            data.donation.status === 'success'
              ? 'Thank you. Your donation has been confirmed successfully.'
              : 'Your payment is still being processed. Please check again shortly.',
          );
        }
      } catch (verificationError) {
        if (!cancelled) {
          setError(
            verificationError instanceof Error
              ? verificationError.message
              : 'Unable to verify your donation right now.',
          );
        }
      } finally {
        if (!cancelled) {
          setIsVerifying(false);
        }
      }
    };

    verifyDonation();

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, handledReference, reference]);

  useEffect(() => {
    if (status === 'cancelled') {
      setError('The donation flow was cancelled before payment was completed.');
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HomeTopbar />

      <main className="overflow-hidden">
        <section className="relative isolate px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-36">
          <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(98,146,214,0.24),_transparent_60%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <HeartHandshake className="h-4 w-4" />
                Support the HROGA mission
              </div>

              <div className="space-y-5">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[var(--darkNavy)] sm:text-6xl">
                    Give meaningfully. <br/><ItalicTitle title="Give with purpose." colorClass='text-primary font-medium text-4xl sm:text-[3.8rem]'/>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Power projects that support students, strengthen alumni engagement, and sustain
                  the Holy Rosary legacy. Your gift is securely processed through Paystack.
                </p>
              </div>

              <div className="rounded-[1rem] border border-primary/15 bg-[linear-gradient(135deg,rgba(98,146,214,0.10),rgba(255,255,255,0.92))] p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                      Preferred contribution
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-[var(--darkNavy)]">
                      {amountLabel}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {suggestedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setSelectedAmount(amount)}
                        className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                          selectedAmount === amount
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-primary/40'
                        }`}
                      >
                        {formatCurrency(amount)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <DonateForm
              apiBaseUrl={apiBaseUrl}
              initialAmount={selectedAmount}
              onAmountChange={setSelectedAmount}
              error={error}
              successMessage={successMessage}
              verifiedDonation={verifiedDonation}
              isVerifying={isVerifying}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
