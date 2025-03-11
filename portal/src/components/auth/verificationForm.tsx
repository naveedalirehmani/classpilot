import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";

interface VerificationFormProps {
  email: string;
  onSubmit: (code: string) => void;
  onResend: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  email,
  onSubmit,
  onResend,
}) => {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill("")
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const router = useRouter();
  const TEST_OTP = "123456";
  
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newVerificationCode = [...verificationCode];

    newVerificationCode[index] = value.slice(0, 1);
    setVerificationCode(newVerificationCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (
      newVerificationCode.every((digit) => digit) &&
      !newVerificationCode.includes("")
    ) {
      handleSubmit();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const pastedChars = pastedData.split("");

      const newVerificationCode = [...verificationCode];
      pastedChars.forEach((char, index) => {
        if (index < 6) {
          newVerificationCode[index] = char;
        }
      });

      setVerificationCode(newVerificationCode);

      const focusIndex = Math.min(pastedChars.length, 5);
      inputRefs.current[focusIndex]?.focus();

      if (
        newVerificationCode.every((digit) => digit) &&
        !newVerificationCode.includes("")
      ) {
        handleSubmit();
      }
    }
  };

  const fillTestOTP = () => {
    const testDigits = TEST_OTP.split("");
    setVerificationCode(testDigits);
  };

  const handleSubmit = async () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      setIsSubmitting(true);
      setErrorMessage("");

      if (code === TEST_OTP) {
        console.log("Test OTP verified successfully");
        await onSubmit(code);
        
        localStorage.setItem("reset_email", email);

        setTimeout(() => {
          router.push(Routes.SETNEWPASSWORD);
        }, 1000);
      } else {
        setIsSubmitting(false);
        setErrorMessage("Invalid verification code. For testing, use 123456.");
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </div>
        <CardDescription className="text-base">
          AI-Powered Lesson Planning Assistant
        </CardDescription>
      </CardHeader>

      <CardContent>
        <h2 className="text-2xl font-bold mb-2">Enter verification code</h2>
        <p className="text-gray-600 mb-6">
          A reset code has been sent to{" "}
          <span className="font-semibold">{email}</span>, check your email to
          continue the password reset process.
        </p>

        <div className="flex gap-2 justify-between mb-6">
          {verificationCode.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="w-12 h-16 text-center text-2xl"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              maxLength={1}
              inputMode="numeric"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {errorMessage}
          </p>
        )}

        <div className="text-center mb-6">
          <p>
            Haven&apos;t received the verification code?{" "}
            <button
              type="button"
              onClick={onResend}
              className="text-blue-500 hover:underline font-medium"
            >
              Resend it
            </button>
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            For testing:{" "}
            <button
              onClick={fillTestOTP}
              className="text-blue-500 hover:underline font-medium"
            >
              Use test code (123456)
            </button>
          </p>
        </div>

        <Button
          className="w-full py-6 text-lg bg-blue hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={verificationCode.includes("") || isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerificationForm;