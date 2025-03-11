"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInFormValues } from "@/lib/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log(data);
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="w-full"
            width={100}
            height={100}
          />
        </div>
        <p className="text-base text-dark font-openSans font-normal leading-relaxed tracking-normal text-center">
          AI-Powered Lesson Planning Assistant
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password")}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" {...register("rememberMe")} />
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <Button
              type="button"
              variant="link"
              className="text-blue text-xs hover:underline cursor-pointer"
              onClick={() => router.push(Routes.FORGOT_PASSWORD)}
            >
              Forgot Password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue hover:bg-blue-600 text-white"
          >
            Sign In
          </Button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600 text-xs font-medium">
            OR
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Button
          variant="outline"
          className="w-full flex gap-2 justify-center items-center"
          onClick={() =>
            signIn("google", { callbackUrl: Routes.SIGNIN_GOOGLE })
          } // Redirect after sign-in
        >
          <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
          Sign in with Google
        </Button>
        <Button variant="outline" className="w-full">
          Continue as Guest
        </Button>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-xs text-secondary-gray">
          Don't have an account?
          <button
            className="text-blue hover:underline pl-2"
            onClick={() => router.push(Routes.SIGNUP)}
          >
            Sign Up
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}
