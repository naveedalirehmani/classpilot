import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useOnboardingNavigation } from "../../hooks/onboarding/useOnboardingNavigation";
import { OnboardingSchema, onboardingOptions } from "src/schema/onboarding/onboarding.schema";
import { useUpdateUser } from "src/hooks/user/user.hooks";

export const EducationalInfo = () => {
  const { control, watch, trigger } = useFormContext<OnboardingSchema>();
  const { goToNextStep, goToPreviousStep } = useOnboardingNavigation();
  const formData = watch();
  const { mutateAsync: updateUser } = useUpdateUser();
  const handleContinue = async () => {
    const fieldsToValidate = [
      "schoolName",
      "educationalQualification",
      "teacherLicenseNumber",
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      await updateUser({
        schoolName: formData.schoolName,
        educationalQualification: formData.educationalQualification,
        teacherLicenseNumber: formData.teacherLicenseNumber,
      });
      goToNextStep();
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <FormField
          control={control}
          name="schoolName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current School/Institution</FormLabel>
              <FormControl>
                <Input placeholder="Enter your current school or institution" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="educationalQualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Educational Qualification</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your highest qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingOptions.educationalQualifications.map((qualification) => (
                      <SelectItem key={qualification.value} value={qualification.value}>
                        {qualification.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="teacherLicenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher License/Certification Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your teaching license or certification number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={goToPreviousStep}>
            Previous
          </Button>
          <Button type="button" onClick={handleContinue}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};
