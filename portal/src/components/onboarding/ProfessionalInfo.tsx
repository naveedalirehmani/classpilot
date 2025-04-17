import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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

export const ProfessionalInfo = () => {
  const { control, watch, trigger } = useFormContext<OnboardingSchema>();
  const { goToNextStep, goToPreviousStep } = useOnboardingNavigation();
  const { mutateAsync: updateUser } = useUpdateUser();

  const subjectsTaught = watch("subjectsTaught") || [];
  const formData = watch();
  const handleContinue = async () => {
    const fieldsToValidate = [
      "yearsOfExperience",
      "subjectsTaught",
      "gradeLevel",
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      await updateUser({
        yearsOfExperience: Number(formData.yearsOfExperience),
        subjectsTaught: formData.subjectsTaught.join(","),
        gradeLevel: formData.gradeLevel,
      });
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="yearsOfExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter years of experience"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="subjectsTaught"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subjects Taught</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  field.onChange([...(field.value || []), value]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            {subjectsTaught.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {subjectsTaught.map((subject, index) => (
                  <div key={index} className="bg-primary/10 px-2 py-1 rounded">
                    {subject}
                  </div>
                ))}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="gradeLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grade Level</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elementary">Elementary School</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                </SelectContent>
              </Select>
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
