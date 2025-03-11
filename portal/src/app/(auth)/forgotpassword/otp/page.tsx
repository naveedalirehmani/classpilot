"use client";

import VerificationForm from "@/components/auth/verificationForm";

export default function Otp() { 
  return (
    <div className="flex justify-center items-center h-screen">
      <VerificationForm
        email="user@example.com"
        onSubmit={(otp) => console.log("Submitted OTP:", otp)}
        onResend={() => console.log("Resend OTP clicked")}
      />
    </div>
  );
}
