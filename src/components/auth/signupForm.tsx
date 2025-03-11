"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { EmailSignUp } from "@/components/steps/EmailSignUp";
import { PersonalInfoForm } from "@/components/steps/PersonalInfoForm";
import { OrganizationInfoForm } from "@/components/steps/OrganizationInfoForm";
import { signUpSchema, SignUpFormValues } from "@/lib/schema";

export function SignUpForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const totalSteps = 3;

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      organization: "",
      profession: "",
      referral: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, trigger, formState } = methods;

  useEffect(() => {
    console.log("Current step:", currentStep);
  }, [currentStep]);

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("Form submitted:", data);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Account created successfully!");
        router.push("/signin");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleContinue = async () => {
    console.log("Validating fields for step:", currentStep);
    let isValid = false;

    switch (currentStep) {
      case 0:
        isValid = await trigger("email");
        break;
      case 1:
        isValid = await trigger(["fullName", "password"]);
        break;
      case 2:
        isValid = await trigger(["organization", "profession", "referral"]);
        break;
      default:
        isValid = false;
    }

    if (isValid) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit(onSubmit)();
      }
    } else {
      console.log("Validation failed, staying on current step");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="flex w-full">
            <Image
              src="/logo.svg"
              className="w-full"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
        </div>
        <p className="text-md text-gray-700 font-normal">
          AI-Powered Lesson Planning Assistant
        </p>
      </CardHeader>

      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 0 && <EmailSignUp onContinue={handleContinue} />}
            {currentStep === 1 && (
              <PersonalInfoForm
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            )}
            {currentStep === 2 && <OrganizationInfoForm />}

            <div className="flex justify-center mt-6">
              <Button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleContinue}
              >
                {currentStep === totalSteps - 1 ? "Create account" : "Continue"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>

      <CardFooter className="flex justify-center">
        {currentStep > 0 && (
          <Button
            type="button"
            variant="link"
            className="text-blue"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
