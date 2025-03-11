import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { SignUpFormValues } from "@/lib/schema";
import { Routes } from "@/lib/routes";
import { useRouter } from "next/navigation";

interface EmailSignUpProps {
  onContinue?: () => void;
}

export const EmailSignUp: React.FC<EmailSignUpProps> = ({ onContinue }) => {
  const router = useRouter();

  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormValues>();

  const handleEmailSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mb-4">Sign Up</h2>

      <div className="space-y-2">
        <div className="space-y-4">
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
        <Button
          type="button"
          className="w-full bg-blue hover:bg-blue-600 mt-4"
          onClick={handleEmailSignUp}
        >
          Sign up with email
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">OR</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => router.push(Routes.SIGNIN_GOOGLE)}
        >
          <span className="mr-2">○</span>
          Sign In with Google
        </Button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            className=" ml-2 text-blue font-medium cursor-pointer "
            onClick={() => router.push(Routes.SIGNIN)}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
