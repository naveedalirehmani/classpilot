import { z } from "zod";

export const onboardingSchema = z.object({
  // Personal Info
  organization: z.string().min(1, "Organization is required"),
  profession: z.string().min(1, "Profession is required"),
  howDidYouHearAboutUs: z
    .string()
    .min(1, "Please let us know how you found us"),

  // Professional Info
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  subjectsTaught: z
    .array(z.string())
    .min(1, "Please select at least one subject"),
  gradeLevel: z.string().min(1, "Grade level is required"),

  // Educational Info
  schoolName: z.string().min(1, "School name is required"),
  educationalQualification: z
    .string()
    .min(1, "Educational qualification is required"),
  teacherLicenseNumber: z.string().min(1, "Teacher license number is required"),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
