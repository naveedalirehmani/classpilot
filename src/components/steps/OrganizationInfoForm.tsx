// steps/OrganizationInfoForm.tsx
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
import { StepProps } from "../auth/types";

export const OrganizationInfoForm: React.FC<StepProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  errors,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">General information</h2>

      <div className="space-y-2">
        <Label htmlFor="organization">Organization</Label>
        <Input
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleInputChange}
          placeholder="Enter organization"
          className={`w-full ${errors.organization ? "border-red-500" : ""}`}
        />
        {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession">Your profession</Label>
        <Select
          value={formData.profession}
          onValueChange={(value) => handleSelectChange("profession", value)}
        >
          <SelectTrigger id="profession" className={`w-full ${errors.profession ? "border-red-500" : ""}`}>
            <SelectValue placeholder="Please select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="teacher">Educator (k-12)</SelectItem>
            <SelectItem value="professor">Educator (Higher-ed)</SelectItem>
            <SelectItem value="administrator">Trainer</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.profession && <p className="text-red-500 text-xs mt-1">{errors.profession}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="referral">How did you hear about Us?</Label>
        <Select
          value={formData.referral}
          onValueChange={(value) => handleSelectChange("referral", value)}
        >
          <SelectTrigger id="referral" className="w-full">
            <SelectValue placeholder="Please select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="social">Online search</SelectItem>
            <SelectItem value="friend">Social media</SelectItem>
            <SelectItem value="search">Blog or article</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};