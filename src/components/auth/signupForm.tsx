"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

  const onSubmit = (data: SignUpFormValues) => {
    console.log("Form submitted:", data);

    // Save the form data in an object
    const formData = {
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      organization: data.organization,
      profession: data.profession,
      referral: data.referral,
    };

    // Save the form data in an array (if needed)
    const formDataArray = [
      { field: "email", value: data.email },
      { field: "fullName", value: data.fullName },
      { field: "password", value: data.password },
      { field: "organization", value: data.organization },
      { field: "profession", value: data.profession },
      { field: "referral", value: data.referral },
    ];

    console.log("Form Data (Object):", formData);
    console.log("Form Data (Array):", formDataArray);

    // You can now send this data to your backend or store it in state/local storage
    // For example, sending to an API:
    // fetch('/api/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });

    // Redirect to the dashboard after saving the data
    // router.push("");
  };

  const handleContinue = async () => {
    console.log("Validating fields for step:", currentStep);
    let isValid = false;

    switch (currentStep) {
      case 0:
        isValid = await trigger("email");
        console.log("Email validation result:", isValid, formState.errors);
        break;
      case 1:
        isValid = await trigger(["fullName", "password"]);
        console.log("Personal info validation result:", isValid, formState.errors);
        break;
      case 2:
        isValid = await trigger(["organization", "profession", "referral"]);
        console.log("Organization validation result:", isValid, formState.errors);
        break;
      default:
        isValid = false;
    }
    if (isValid) {
      console.log("Validation passed, moving to next step");
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmit(onSubmit)();
      }
    } else {
      console.log("Validation failed, staying on current step");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              className="w-full"
              alt="Logo"
              width={24}
              height={24}
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
            {currentStep === 1 && <PersonalInfoForm showPassword={showPassword} setShowPassword={setShowPassword} />}
            {currentStep === 2 && <OrganizationInfoForm />}
            {currentStep > 0 && (
              <div className="flex justify-center mt-6">
                <Button
                  type="button" 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleContinue}
                >
                  {currentStep === totalSteps - 1 ? "Create account" : "Continue"}
                </Button>
              </div>
            )}
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