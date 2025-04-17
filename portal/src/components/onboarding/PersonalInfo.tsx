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

export const PersonalInfo = () => {
  const { control, trigger, watch } = useFormContext<OnboardingSchema>();
  const { goToNextStep } = useOnboardingNavigation();
  const formData = watch();
  const { mutateAsync: updateUser } = useUpdateUser();

  const handleContinue = async () => {
    const fieldsToValidate = [
      "organization",
      "profession",
      "howDidYouHearAboutUs",
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      await updateUser({
        organization: formData.organization,
        profession: formData.profession,
        howDidYouHearAboutUs: formData.howDidYouHearAboutUs,
      });
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="organization"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization</FormLabel>
            <FormControl>
              <Input placeholder="Enter your organization name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="profession"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profession</FormLabel>
            <FormControl>
              <Input placeholder="Enter your profession" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="howDidYouHearAboutUs"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How did you hear about us?</FormLabel>
            <FormControl>
              <Input placeholder="Let us know how you found us" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end pt-4">
        <Button type="button" onClick={handleContinue}>
          Next
        </Button>
      </div>
    </div>
  );
};
