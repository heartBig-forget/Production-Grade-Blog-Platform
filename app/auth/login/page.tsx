"use client";

import { LoginSchema } from '@/app/schemas/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from "@/lib/auth-client";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from "sonner";
import z from 'zod';

const LoginPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  function onSubmit(data: z.infer<typeof LoginSchema>){
    startTransition(async() => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged in successfully");
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error?.message);
          },
        },
      });
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-4">
            <Controller name="email" control={form.control} 
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} placeholder="XXXXXX@email.com" {...field}></Input>
                  { fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} /> 
                  )}
                </Field>
              )} 
            />

            <Controller name="password" control={form.control} 
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} type="password" placeholder="******" {...field}></Input>
                  { fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} /> 
                  )}
                </Field>
              )} 
            />

            <Button disabled={isPending} type="submit" className="w-full mt-4">
              { isPending ? (
                  <>
                    <Spinner data-icon="inline-start"></Spinner>
                    <span className="ml-2">Logging in...</span>
                  </>
                ) : (
                  <span>Login</span>
                )
              }
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginPage