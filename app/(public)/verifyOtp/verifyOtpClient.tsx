'use client';

import { useSearchParams } from 'next/navigation';
import { VerifyOtpForm } from './verify-otp-form';

export default function VerifyOtpPageClient() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return <VerifyOtpForm email={email ?? ''} />;
}
