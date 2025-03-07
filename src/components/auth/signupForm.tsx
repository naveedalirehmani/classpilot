// index.tsx (main component)
"use client";
import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { EmailSignUp } from "@/components/steps/EmailSignUp";
import { PersonalInfoForm } from "@/components/steps/PersonalInfoForm";
import { OrganizationInfoForm } from "@/components/steps/OrganizationInfoForm";
import { FormData } from "../auth/types";

export default function SignUpFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    email: "",
    fullName: "",
    password: "",
    organization: "",
    profession: "",
    referral: "",
  });

  // Define all the steps in the sign-up flow
  const totalSteps = 3;

  // Memoized input change handler to prevent focus loss
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    
    // Clear error for this field when user is typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user selects a value
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Validate current step
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 0:
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
        break;
      case 1:
        if (!formData.fullName) {
          newErrors.fullName = "Full name is required";
        }
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(formData.password)) {
          newErrors.password = "Password must meet all requirements";
        }
        break;
      case 2:
        if (!formData.organization) {
          newErrors.organization = "Organization is required";
        }
        if (!formData.profession) {
          newErrors.profession = "Profession is required";
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Form submitted:", formData);
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to render the current step component
  const renderCurrentStep = () => {
    const commonProps = {
      formData,
      handleInputChange,
      handleSelectChange,
      errors,
      handleContinue,
      showPassword,
      setShowPassword,
    };

    switch (currentStep) {
      case 0:
        return <EmailSignUp {...commonProps} />;
      case 1:
        return <PersonalInfoForm {...commonProps} />;
      case 2:
        return <OrganizationInfoForm {...commonProps} />;
      default:
        return <EmailSignUp {...commonProps} />;
    }
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              className="w-fit"
              alt="Logo"
              width={24}
              height={24}
            />
            <span className="text-xl font-semibold">ClassPlanner</span>
          </div>
        </div>
        <p className="text-md text-gray-700 font-normal">
          AI-Powered Lesson Planning Assistant
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleContinue}>
          {renderCurrentStep()}

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {currentStep === totalSteps - 1
                ? "Finish signing up"
                : "Continue"}
            </Button>
          </div>
        </form>
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

        {currentStep === 0 ? (
          <div></div> // Empty div to maintain flex spacing when back button is hidden
        ) : null}
      </CardFooter>
    </Card>
  );
}