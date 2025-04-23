"use client";

import React from "react";
import { FormControl, FormMessage } from "src/components/ui/form";
import { FormLabel } from "src/components/ui/form";
import { FormItem } from "src/components/ui/form";
import { FormField } from "src/components/ui/form";
import { Form } from "src/components/ui/form";
import { ROUTES } from "src/lib/routes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "src/components/ui/card";
import { useSignIn } from "src/hooks/auth/auth.hooks";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInFormSchema,
  SignInFormValues,
} from "../../../schema/auth/auth.schema";
import { useRouter } from "next/navigation";

function SignIn() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
  });

  const router = useRouter();
  const { mutate: signInMutation, isPending } = useSignIn();

  const onSubmit = (data: SignInFormValues) => {
    signInMutation(data);
  };

  return (
    <Card className="w-[400px] max-w-md mx-auto">
      <CardHeader className="text-center">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isPending}
            >
              {isPending ? "Signing In..." : "Sign In with email"}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  OR
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push(ROUTES.SIGNIN_GOOGLE)}
            >
              <span className="mr-2">○</span> Sign In with Google
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="ml-2 text-primary font-medium cursor-pointer"
                onClick={() => router.push(ROUTES.SIGNUP)}
              >
                Sign Up
              </button>
            </p>
          </form>
        </Form>
      </CardContent>
      <CardFooter />
    </Card>
  );
}

export default SignIn;
