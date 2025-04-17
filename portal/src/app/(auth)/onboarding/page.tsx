import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingStep } from "../../../types/onboarding";
import { useOnboardingNavigation } from "../../../hooks/onboarding/useOnboardingNavigation";
import { PersonalInfo } from "../../../components/onboarding/PersonalInfo";
import { ProfessionalInfo } from "../../../components/onboarding/ProfessionalInfo";
import { EducationalInfo } from "../../../components/onboarding/EducationalInfo";
import { Review } from "../../../components/onboarding/Review";
import { toast } from "sonner";
import { Form } from "../../../components/ui/form";
import {
  OnboardingSchema,
  onboardingSchema,
} from "src/schema/onboarding/onboarding.schema";
import { useUpdateUser } from "src/hooks/user/user.hooks";

type StepComponents = {
  [key in OnboardingStep]: React.ComponentType;
};

export default function OnboardingPage() {
  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      organization: "",
      profession: "",
      howDidYouHearAboutUs: "",
      yearsOfExperience: "",
      subjectsTaught: [],
      gradeLevel: "",
      schoolName: "",
      educationalQualification: "",
      teacherLicenseNumber: "",
    },
  });

  const { currentStep } = useOnboardingNavigation();
  const { mutateAsync: updateUser } = useUpdateUser();

  const onSubmit = async (data: OnboardingSchema) => {
    try {
      await updateUser({
        ...data,
        yearsOfExperience: Number(data.yearsOfExperience),
        subjectsTaught: data.subjectsTaught.join(","),
      });
      console.log("Submitting data:", data);
      toast.success("Onboarding completed successfully!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to complete onboarding";
      toast.error(errorMessage);
    }
  };

  const AllSteps: StepComponents = {
    [OnboardingStep.PERSONAL_INFO]: PersonalInfo,
    [OnboardingStep.PROFESSIONAL_INFO]: ProfessionalInfo,
    [OnboardingStep.EDUCATIONAL_INFO]: EducationalInfo,
    [OnboardingStep.REVIEW]: Review,
  };

  const CurrentComponent = AllSteps[currentStep];

  return (
    <div className="container max-w-2xl mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Please provide the following information to get started
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CurrentComponent />
          </form>
        </Form>
      </div>
    </div>
  );
}
