/**
 * Monnify Inline JS SDK wrapper for Next.js / React.
 *
 * Provides typed helpers that call `MonnifySDK.initialize()` and return
 * a Promise that resolves on successful payment or rejects on close/cancel.
 */

/* ---------- Global type augmentation ---------- */

export interface MonnifyResponse {
  /** e.g. "USER_CANCELLED", "PAYMENT_SUCCESSFUL" */
  status: string;
  /** Monnify transaction reference (MNFY|…) */
  transactionReference?: string;
  /** Your payment reference */
  paymentReference?: string;
  /** e.g. "PAID" */
  paymentStatus?: string;
  /** Redirect URL if any */
  redirectUrl?: string;
  /** Amount paid */
  authorizedAmount?: number;
  [key: string]: unknown;
}

export interface MonnifyInitializeOptions {
  amount: number;
  currency: string;
  reference: string;
  customerFullName: string;
  customerEmail: string;
  apiKey: string;
  contractCode: string;
  paymentDescription: string;
  metadata?: Record<string, unknown>;
  isTestMode?: boolean;
  onComplete: (response: MonnifyResponse) => void;
  onClose: (data: MonnifyResponse) => void;
}

declare global {
  interface Window {
    MonnifySDK?: {
      initialize: (options: MonnifyInitializeOptions) => void;
    };
  }
}

/* ---------- Core helper ---------- */

/**
 * Opens the Monnify inline popup and returns a Promise.
 * Resolves with the gateway response on completed payment.
 * Rejects if the user closes the popup without paying.
 */
export function payWithMonnify(options: {
  reference: string;
  amount: number;
  email: string;
  fullName: string;
  description: string;
  metadata?: Record<string, unknown>;
}): Promise<MonnifyResponse> {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.NEXT_PUBLIC_MONNIFY_API_KEY;
    const contractCode = process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE;

    if (!apiKey || !contractCode) {
      reject(
        new Error(
          'Monnify is not configured. Set NEXT_PUBLIC_MONNIFY_API_KEY and NEXT_PUBLIC_MONNIFY_CONTRACT_CODE in .env.',
        ),
      );
      return;
    }

    if (!window.MonnifySDK) {
      reject(
        new Error(
          'Monnify SDK is not loaded. Check that the script tag is in your layout.',
        ),
      );
      return;
    }

    window.MonnifySDK.initialize({
      amount: options.amount,
      currency: 'NGN',
      reference: options.reference,
      customerFullName: options.fullName,
      customerEmail: options.email,
      apiKey,
      contractCode,
      paymentDescription: options.description,
      metadata: options.metadata,
      isTestMode: true, // Set to false for production
      onComplete(response: MonnifyResponse) {
        resolve(response);
      },
      onClose(data: MonnifyResponse) {
        // If the user closed the popup without completing payment
        if (data?.status === 'USER_CANCELLED' || !data?.paymentStatus || data?.paymentStatus !== 'PAID') {
          reject(new Error('Payment was cancelled before completion.'));
        } else {
          // Payment was completed before close
          resolve(data);
        }
      },
    });
  });
}

/* ---------- Convenience wrappers ---------- */

export function payDonation(options: {
  reference: string;
  amount: number;
  email: string;
  fullName: string;
  purpose?: string;
}) {
  return payWithMonnify({
    reference: options.reference,
    amount: options.amount,
    email: options.email,
    fullName: options.fullName,
    description: options.purpose || 'Donation to HROGA',
    metadata: {
      fullName: options.fullName,
      purpose: options.purpose,
      type: 'donation',
    },
  });
}

export function payDues(options: {
  reference: string;
  amount: number;
  email: string;
  fullName: string;
  description?: string;
}) {
  return payWithMonnify({
    reference: options.reference,
    amount: options.amount,
    email: options.email,
    fullName: options.fullName,
    description: options.description || 'Monthly Dues Payment',
    metadata: {
      fullName: options.fullName,
      type: 'dues',
    },
  });
}
