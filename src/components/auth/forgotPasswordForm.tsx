import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import VerificationForm from "@/components/auth/verificationForm";

const PasswordResetFom = () => {
  const [currentStep, setCurrentStep] = useState("reset");
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onResetSubmit = (data: any) => {
    console.log("Sending verification code to:", data.email);
    setUserEmail(data.email);
    setCurrentStep("verification");
  };

  const handleVerificationSubmit = (code: string) => {
    console.log("Verifying code:", code, "for email:", userEmail);
  };

  const handleResendCode = () => {
    console.log("Resending verification code to:", userEmail);
    // Here you would typically call an API to resend the code
    alert(`Verification code resent to ${userEmail}`);
  };

  // Render the password reset form
  if (currentStep === "reset") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center">
          <div className="mb-4">
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
          </div>
          <CardTitle className="text-xl text-center">
            Reset your password
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Enter the email address associated with your account, and we will
            send you a 6-digit code to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onResetSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Send verification code
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  // Render the verification form component
  return (
    <VerificationForm
      email={userEmail}
      onSubmit={handleVerificationSubmit}
      onResend={handleResendCode}
    />
  );
};

export default PasswordResetFom;