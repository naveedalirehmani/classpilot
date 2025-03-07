"use client";
import React from "react";
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

export default function SignInForm() {
    const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              className="w-fit"
              alt="Logo"
              width={24}
              height={24}
            />
          </div>
        </div>
        <p className="text-base text-dark font-openSans font-normal leading-relaxed tracking-normal text-center">
          AI-Powered Lesson Planning Assistant
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Sign In</h2>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-dark font-semibold font-sans"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="moeez.ali@gmail.com"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-dark font-semibold font-sans"
            >
              Password
            </Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full pr-10"
              placeholder="********"
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
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label
              htmlFor="remember"
              className="font-openSans text-xs font-normal"
            >
              Remember Me
            </Label>
          </div>
          <a
            href="#"
            className="text-blue text-xs hover:underline font-openSans font-normal"
          >
            Forgot Password
          </a>
        </div>

        <Button className="w-full bg-blue hover:bg-blue-600 text-white font-openSans text-sm font-semibold">
          Sign In
        </Button>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600 text-xs font-medium font-inter">
            OR
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Button
          variant="outline"
          className="w-full flex gap-2 justify-center items-center text-primary-gray font-openSans font-semibold text-sm cursor-pointer"
        >
          <Image src="/icons/google.svg" alt="Google" width={20} height={20} 
          onClick={onclick=()=> router.push("/signingoogle")}/>
          Sign in with google
        </Button>

        <Button variant="outline" className="w-full text-primary-gray font-openSans font-semibold text-sm">
          Continue as Guest
        </Button>
      </CardContent>
    

      <CardFooter className="flex justify-center">
        <p className="text-xs text-secondary-gray font-openSans font-normal ">
          {"Don't have an account?"}
          <button className="text-blue hover:underline pl-2 cursor-pointer">
            Sign Up
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}
