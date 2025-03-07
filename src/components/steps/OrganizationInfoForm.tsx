import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { FormData } from "../auth/types";

export const OrganizationInfoForm: React.FC = () => {
  const { register, formState: { errors }, setValue } = useFormContext<FormData>();

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mb-4">General information</h2>

      <div className="space-y-4">
        <div className="w-full">
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            className="w-full"
            {...register("organization")}
          />
          {errors.organization && <p className="text-red-500 text-sm">{errors.organization.message}</p>}
        </div>

        <div className="w-full">
          <Label htmlFor="profession">Your profession</Label>
          <Select onValueChange={(value) => setValue("profession", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your profession" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="Educator (k-12)">Educator (k-12)</SelectItem>
              <SelectItem value="Educator (Higher-ed)">Educator (Higher-ed)</SelectItem>
              <SelectItem value="Trainer">Trainer</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.profession && <p className="text-red-500 text-sm">{errors.profession.message}</p>}
        </div>

        <div className="w-full">
          <Label htmlFor="referral">How did you hear about Us?</Label>
          <Select onValueChange={(value) => setValue("referral", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="Online search">Online search</SelectItem>
              <SelectItem value="Social media">Social media</SelectItem>
              <SelectItem value="Blog or article">Blog or article</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.referral && <p className="text-red-500 text-sm">{errors.referral.message}</p>}
        </div>
      </div>
    </div>
  );
};