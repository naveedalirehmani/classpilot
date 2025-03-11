export interface FormData {
    email: string;
    fullName: string;
    password: string;
    organization: string;
    profession: string;
    referral: string;
  }
  
  export interface StepProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (name: string, value: string) => void;
    errors: Record<string, string>;
    handleContinue: (e: React.FormEvent) => void;
    showPassword?: boolean;
    setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  }