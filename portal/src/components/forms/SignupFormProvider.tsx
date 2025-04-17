"use client";

import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema,  SignUpFormValues } from "../../lib/schema";

interface SignupFormProviderProps {
  children: ReactNode;
}

export function SignupFormProvider({ children }: SignupFormProviderProps) {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      organization: "",
      profession: "",
      referral: "",
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
