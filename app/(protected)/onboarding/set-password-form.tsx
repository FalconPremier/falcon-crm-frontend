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
import { useAuthStore } from '@/lib/store';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { postRequestHandler } from '@/lib/apis';
import { AuthRoutes } from '@/lib/apis/routes';
import { redirect } from 'next/navigation';

export function SetPasswordForm({
  source,
  email,
  verificationToken,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  source: 'reset' | 'onboarding';
  email?: string;
  verificationToken?: string;
}) {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const formSchema = z
    .object({
      password: z.string().min(6, 'Password must be at least 6 characters'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitHandler = async (values: z.infer<typeof formSchema>) => {
    if (source === 'onboarding') {
      const response: undefined | null = await postRequestHandler<
        undefined,
        {
          password: string;
        }
      >(
        AuthRoutes.SET_PASSWORD,
        {
          password: values.password,
        },
        accessToken ?? '',
      );
      console.log(response);
    }
    if (source === 'reset') {
      if (!email || email == '' || !verificationToken || verificationToken == '') {
        alert('Please enter a valid email or verificationToken');
        return;
      }
      const response: undefined | null = await postRequestHandler<
        undefined,
        {
          email: string;
          verificationToken: string;
          password: string;
        }
      >(AuthRoutes.FORGOT_PASSWORD, {
        email: email,
        verificationToken: verificationToken,
        password: values.password,
      });
      console.log(response);
      if (response === undefined) redirect('/login');
    }
  };

  if (!user || !accessToken) return null;
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="gap-12">
        <CardHeader className="flex flex-col items-center justify-center gap-5 text-center">
          <Image src="/FalconLogo.png" alt="Falcon" width={200} height={200} />
          <CardTitle className="text-xl text-slate-500">{`Hi, ${user.name ?? 'User'}`}</CardTitle>
          <CardDescription className="text-sm text-black">
            Congratulations on joining Falcon Premier Team, set a new password for your account
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                                tabIndex={-1}
                              >
                                {showPassword ? <EyeOff /> : <Eye />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                {...field}
                                onChange={async (e) => {
                                  field.onChange(e);
                                  const isValid = await form.trigger('confirmPassword');
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                                tabIndex={-1}
                              >
                                {showConfirmPassword ? <EyeOff /> : <Eye />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Set Password
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
