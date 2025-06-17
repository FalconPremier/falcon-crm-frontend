'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postRequestHandler } from '@/lib/apis';
import { AuthRoutes } from '@/lib/apis/routes';
import { redirect } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export function VerifyOtpForm({
  email,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  email: string;
}) {
  const formSchema = z.object({
    otp: z.string().min(6, {
      message: 'Your one-time password must be 6 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmitHandler = async (values: z.infer<typeof formSchema>) => {
    const response: { otpVerificationToken: string } | null = await postRequestHandler<
      { otpVerificationToken: string },
      {
        email: string;
        otp: string;
        reason: string;
      }
    >(AuthRoutes.VERIFY_OTP, {
      otp: values.otp,
      reason: 'FORGOT_PASSWORD',
      email,
    });
    console.log(response);
    if (response?.otpVerificationToken)
      redirect(
        `/resetPassword?email=${encodeURIComponent(email)}&token=${encodeURIComponent(response.otpVerificationToken)}`,
      );
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="gap-12">
        <CardHeader className="flex flex-col items-center justify-center gap-5 text-center">
          <Image src="/FalconLogo.png" alt="Falcon" width={200} height={200} />
          <CardTitle className="text-xl text-slate-500">{`Verify OTP`}</CardTitle>
          <CardDescription className="text-sm text-black">
            {`Enter the One-Time Verification Code sent yo you on ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="flex grid justify-center gap-3">
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="justify-center">OTP</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Verify
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
