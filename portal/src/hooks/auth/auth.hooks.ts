import { SignInRequest } from "../../types/auth";
import { QueryKeys } from "../../querykey";
import authService from "../../services/auth/auth.service";
import { SignUpRequest } from "../../types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {useRouter} from 'next/navigation';
import { ROUTES } from "src/lib/routes";

export const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [QueryKeys.AUTH, QueryKeys.SIGN_UP],
    mutationFn: (data: SignUpRequest) => authService.signUp(data),
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push(ROUTES.ONBOARDING);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to create account");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [QueryKeys.AUTH, QueryKeys.SIGN_IN],
    mutationFn: (data: SignInRequest) => authService.signIn(data),
    onSuccess: () => {
      toast.success("Signed in successfully!");
      router.push(ROUTES.DASHBOARD);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to sign in");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: [QueryKeys.AUTH, QueryKeys.CURRENT_USER],
    queryFn: () => authService.getCurrentUser(),
  });
};

export const useSignOut = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [QueryKeys.AUTH, QueryKeys.SIGN_OUT],
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      toast.success("Signed out successfully!");
      router.push(ROUTES.SIGNIN);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to sign out");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};