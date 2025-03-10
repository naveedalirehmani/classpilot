import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { z } from "zod";
import Image from "next/image";

// Define form values type based on schema
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const SetNewPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log("Password set successfully:", data);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="flex flex-col items-start space-y-1.5 pb-4">
        <div className="flex items-center mb-2 mx-auto">
          <Image 
          src="/logo.svg"
          alt="logo"
          className="w-full mx-auto"
          width={100}
          height={100}/>
        </div>
        <p className="text-sm text-gray-500 mx-auto">
          AI-Powered Lesson Planning Assistant
        </p>
      </CardHeader>

      <CardContent>
        <h2 className="text-xl font-bold mb-2">Create a new password</h2>
        <p className="text-gray-600 mb-6">
          Your new password must be different from previously used passwords.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pr-10"
                placeholder="********"
                {...register("password")}
              />
              <Button
                type="button"
                variant="link"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="pr-10"
                placeholder="********"
                {...register("confirmPassword")}
              />
              <Button
                type="button"
                variant="link"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Set Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SetNewPasswordForm;
