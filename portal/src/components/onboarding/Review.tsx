import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { useOnboardingNavigation } from "../../hooks/onboarding/useOnboardingNavigation";
import { OnboardingSchema } from "src/schema/onboarding/onboarding.schema";

export const Review = () => {
  const { watch } = useFormContext<OnboardingSchema>();
  const { goToPreviousStep } = useOnboardingNavigation();
  const formData = watch();

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Organization", value: formData.organization },
        { label: "Profession", value: formData.profession },
        { label: "How did you hear about us?", value: formData.howDidYouHearAboutUs },
      ],
    },
    {
      title: "Professional Information",
      fields: [
        { label: "Years of Experience", value: formData.yearsOfExperience },
        { label: "Subjects Taught", value: formData.subjectsTaught?.join(", ") },
        { label: "Grade Level", value: formData.gradeLevel },
      ],
    },
    {
      title: "Educational Information",
      fields: [
        { label: "School Name", value: formData.schoolName },
        { label: "Educational Qualification", value: formData.educationalQualification },
        { label: "Teacher License Number", value: formData.teacherLicenseNumber },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-lg font-semibold">{section.title}</h3>
          <div className="grid gap-4">
            {section.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="grid grid-cols-2 gap-4">
                <span className="text-muted-foreground">{field.label}:</span>
                <span>{field.value || "Not provided"}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={goToPreviousStep}>
          Previous
        </Button>
        <Button type="submit">
          Complete
        </Button>
      </div>
    </div>
  );
}; 