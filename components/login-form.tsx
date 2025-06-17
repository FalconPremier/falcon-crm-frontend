'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ILoginResponse } from '@/interfaces/IResponse';
import { postRequestHandler } from '@/lib/apis';
import { AuthRoutes } from '@/lib/apis/routes';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitHandler = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const response: ILoginResponse | null = await postRequestHandler<
      ILoginResponse,
      {
        email: string;
        password: string;
      }
    >(AuthRoutes.LOGIN, {
      email: values.email,
      password: values.password,
    });
    if (response) {
      useAuthStore.getState().setAuth(
        {
          id: response.user._id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          onboarded: response.user.onboarded,
        },
        response.accessToken,
      );
      toast.success(`Welcome ${response.user.name}`);
      if (response.user.onboarded) redirect('/dashboard');
      else redirect('/onboarding');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="gap-12">
        <CardHeader className="flex flex-col items-center justify-center gap-5 text-center">
          <a href="#" className="flex items-center gap-2 self-center font-medium">
            <Image src="/FalconLogo.png" alt="Falcon" width={200} height={200} />
          </a>
          <CardTitle className="text-xl text-slate-500">Welcome back</CardTitle>
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
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                    <Link
                      href="/forgotPassword"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <a href="#" className="underline underline-offset-4">
                    Join Falcon Premier Team
                  </a>
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
