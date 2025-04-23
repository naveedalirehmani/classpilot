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
import { Card } from "../ui/card";
import { useOnboardingNavigation } from "../../hooks/onboarding/useOnboardingNavigation";
import { OnboardingSchema, onboardingOptions } from "src/schema/onboarding/onboarding.schema";
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
        yearsOfExperience: formData.yearsOfExperience,
        subjectsTaught: formData.subjectsTaught.join(","),
        gradeLevel: formData.gradeLevel,
      });
      goToNextStep();
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <FormField
          control={control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Teaching Experience</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={50}
                  placeholder="Enter years of experience"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      field.onChange("");
                    } else {
                      const num = parseInt(value, 10);
                      if (!isNaN(num)) {
                        field.onChange(num);
                      }
                    }
                  }}
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
                    if (!field.value?.includes(value)) {
                      field.onChange([...(field.value || []), value]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingOptions.subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {subjectsTaught.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {subjectsTaught.map((subjectValue, index) => {
                    const subject = onboardingOptions.subjects.find(s => s.value === subjectValue);
                    return (
                      <div 
                        key={index} 
                        className="bg-primary/10 px-2 py-1 rounded flex items-center gap-2"
                      >
                        <span>{subject?.label || subjectValue}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newSubjects = [...subjectsTaught];
                            newSubjects.splice(index, 1);
                            field.onChange(newSubjects);
                          }}
                          className="text-xs hover:text-destructive"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingOptions.gradeLevels.map((grade) => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </SelectItem>
                    ))}
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
    </Card>
  );
};
