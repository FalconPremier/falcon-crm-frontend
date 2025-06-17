'use client';

import { useSearchParams } from 'next/navigation';
import { SetPasswordForm } from '@/app/(protected)/onboarding/set-password-form';

export default function ResetPasswordPageClient() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  return <SetPasswordForm email={email ?? ''} source="reset" verificationToken={token ?? ''} />;
}
