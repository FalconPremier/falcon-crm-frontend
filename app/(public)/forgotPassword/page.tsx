import { ForgotPasswordForm } from '@/app/(public)/forgotPassword/forgot-password-form';

export default function ForgotPassword() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-10">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
