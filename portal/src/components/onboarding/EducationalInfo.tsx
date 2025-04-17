import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useOnboardingNavigation } from "../../hooks/onboarding/useOnboardingNavigation";
import { OnboardingSchema } from "src/schema/onboarding/onboarding.schema";
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
    <div className="space-y-6">
      <FormField
        control={control}
        name="schoolName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>School Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your school name" {...field} />
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
              <Input
                placeholder="Enter your highest qualification"
                {...field}
              />
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
            <FormLabel>Teacher License Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter your license number" {...field} />
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
  );
};
