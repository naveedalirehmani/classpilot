// steps/EmailSignUp.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepProps } from "../auth/types";

export const EmailSignUp: React.FC<StepProps> = ({
  formData,
  handleInputChange,
  errors,
  handleContinue,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter email"
          className={`w-full ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <Button
        type="button"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        onClick={handleContinue}
      >
        Sign up with email
      </Button>

      <div className="flex items-center justify-between my-4">
        <div className="h-px bg-gray-300 w-5/12"></div>
        <span className="text-gray-500 text-sm px-2">OR</span>
        <div className="h-px bg-gray-300 w-5/12"></div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => console.log("Google sign up")}
      >
        <div className="w-5 h-5 rounded-full flex items-center justify-center">
          <span className="text-xl">○</span>
        </div>
        Sign In with Google
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Already have an account?
          <span className="text-blue-500 ml-1 cursor-pointer">Sign In</span>
        </p>
      </div>
    </div>
  );
};