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
import { toast } from 'sonner';

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const formSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmitHandler = async (values: z.infer<typeof formSchema>) => {
    const response: undefined | null = await postRequestHandler<
      undefined,
      {
        email: string;
      }
    >(AuthRoutes.REQUEST_OTP_FORGOT_PASSWORD, {
      email: values.email,
    });
    console.log(response);
    if (response === undefined) {
      toast.success(`OTP Sent to ${values.email}`);
      redirect(`/verifyOtp?email=${encodeURIComponent(values.email)}`);
    }
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="gap-12">
        <CardHeader className="flex flex-col items-center justify-center gap-5 text-center">
          <Image src="/FalconLogo.png" alt="Falcon" width={200} height={200} />
          <CardTitle className="text-xl text-slate-500">{`Forgot Password`}</CardTitle>
          <CardDescription className="text-sm text-black">
            Enter the email associated with your account and an email will be sent with the one time
            verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="email" placeholder="Email" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send OTP
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
