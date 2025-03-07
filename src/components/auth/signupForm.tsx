"use client";
import React, { useState } from "react";
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

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }

    if (!isChecked) {
      setCheckboxError("You must agree to the Terms and Privacy Policy.");
      return;
    } else {
      setCheckboxError("");
    }

    console.log("Form submitted successfully!");
  };

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
        <p className="text-md text-dark font-sans font-normal leading-relaxed tracking-normal text-center ">
          AI-Powered Lesson Planning Assistant
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <h2 className="text-xl font-normal font-roboto text-gray pt-6">
              Sign Up
            </h2>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@example.com"
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full pr-10"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full pr-10 ${
                  passwordError ? "border-red-500" : ""
                }`}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(checked === true)}
              />
              <Label
                htmlFor="terms"
                className="font-sans font-normal text-sm leading-5 tracking-[-0.2px]"
              >
                I agree to the{" "}
                <a href="#" className="text-blue hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
            {checkboxError && (
              <p className="text-sm text-red-500">{checkboxError}</p>
            )}
          </div>

          <Button className="w-full bg-blue hover:bg-blue-600">
            Create account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Already have an account?
          <button
            className="text-blue hover:underline pl-2"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}
