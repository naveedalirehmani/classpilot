
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormData } from "../auth/types";

export const PersonalInfoForm: React.FC<{ showPassword: boolean, setShowPassword: (show: boolean) => void }> = ({ showPassword, setShowPassword }) => {
  const { register, watch, formState: { errors } } = useFormContext<FormData>();
  const password = watch("password", ""); // Get password input value

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} {...register("password")} />
            <button type="button" className="absolute right-2 top-2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          </div>
        </div>

        {/* Password Validation Rules */}
        <p className="text-sm text-gray-600">
          Password must be{" "}
          <span className={hasMinLength ? "text-blue-600 font-medium" : "text-gray-600"}>
            at least 8 characters
          </span>
          {", "}
          <span className={hasNumber ? "text-blue-600 font-medium" : "text-gray-600"}>
            1 number
          </span>
          {", "}
          <span className={hasUpperCase ? "text-blue-600 font-medium" : "text-gray-600"}>
            1 uppercase letter
          </span>
          {" and "}
          <span className={hasSpecialChar ? "text-blue-600 font-medium" : "text-gray-600"}>
            1 special character
          </span>.
        </p>
      </div>
    </div>
  );
};
