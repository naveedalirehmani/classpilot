"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "../../../schema/auth/auth.schema";
import { useSignUp } from "../../../hooks/auth/auth.hooks";
import { SignUpFormValues } from "../../../schema/auth/auth.schema";
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { ROUTES } from "../../../lib/routes";
import {
  CardContent,
  CardHeader,
  CardFooter,
} from "../../../components/ui/card";

const Signup = () => {
  const router = useRouter();
  const { mutateAsync: signUp, isPending } = useSignUp();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    signUp({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="w-[400px] max-w-md mx-auto">
      <CardHeader className="">
        <h2 className="text-xl font-semibold font-roboto">Sign Up</h2>
        <p className="text-sm font-roboto font-mdeium text-muted-foreground mb-4">
          Create an account to get started.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
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
              className="w-full bg-primary mt-4"
              disabled={isPending}
            >
              {isPending ? "Signing up..." : "Sign up with email"}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-muted px-2 text-muted-foreground">OR</span>
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

            <p className="text-center text-sm font-roboto font-normal">
              Already have an account?{" "}
              <button
                type="button"
                className="ml-2 text-primary font-medium cursor-pointer font-roboto"
                onClick={() => router.replace(ROUTES.SIGNIN)}
              >
                Sign In
              </button>
            </p>
          </form>
        </Form>
      </CardContent>
      <CardFooter />
    </div>
  );
};

export default Signup;

// "use client"

// import {SignUpForm}  from "../../../components/auth/signupForm";

// export default function SignInPage() {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <SignUpForm />
//     </div>
//   );
// }
