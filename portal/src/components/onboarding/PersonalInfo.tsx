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
    <Card className="p-6">
      <div className="space-y-6">
        <FormField
          control={control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School/Institution Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your school or institution name" {...field} />
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
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingOptions.professions.map((profession) => (
                      <SelectItem key={profession.value} value={profession.value}>
                        {profession.label}
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
          name="howDidYouHearAboutUs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about us?</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select how you found us" />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingOptions.referralSources.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
    </Card>
  );
};
