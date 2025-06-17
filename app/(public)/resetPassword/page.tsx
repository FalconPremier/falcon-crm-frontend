import ResetPasswordPageClient from '@/app/(public)/resetPassword/resetPasswordClientPage';

export default function ResetPassword() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-10">
        <ResetPasswordPageClient />
      </div>
    </div>
  );
}
