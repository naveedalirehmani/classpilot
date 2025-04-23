import { z } from "zod";
import onboardingData from "../../data/onboarding.json";

// Create enums from the data file
const professionEnum = z.enum(
  onboardingData.professions.map((p) => p.value) as [string, ...string[]]
);
const referralSourceEnum = z.enum(
  onboardingData.referralSources.map((r) => r.value) as [string, ...string[]]
);
const subjectEnum = z.enum(
  onboardingData.subjects.map((s) => s.value) as [string, ...string[]]
);
const gradeLevelEnum = z.enum(
  onboardingData.gradeLevels.map((g) => g.value) as [string, ...string[]]
);
const educationalQualificationEnum = z.enum(
  onboardingData.educationalQualifications.map((e) => e.value) as [
    string,
    ...string[]
  ]
);

// Export the enum types for use in components
export type Profession = z.infer<typeof professionEnum>;
export type ReferralSource = z.infer<typeof referralSourceEnum>;
export type Subject = z.infer<typeof subjectEnum>;
export type GradeLevel = z.infer<typeof gradeLevelEnum>;
export type EducationalQualification = z.infer<
  typeof educationalQualificationEnum
>;

export const onboardingSchema = z.object({
  // Personal Info
  organization: z.string().min(1, "Organization is required"),
  profession: professionEnum.or(z.literal('')).superRefine((val, ctx) => {
    if (!val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select your role",
      });
    }
  }),
  howDidYouHearAboutUs: referralSourceEnum.or(z.literal('')).superRefine((val, ctx) => {
    if (!val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please let us know how you found us",
      });
    }
  }),

  // Professional Info
  yearsOfExperience: z.coerce
    .number()
    .min(0, "Years of experience cannot be negative")
    .max(50, "Please enter a valid number of years")
    .int("Please enter a whole number"),
  subjectsTaught: z
    .array(subjectEnum)
    .min(1, "Please select at least one subject"),
  gradeLevel: gradeLevelEnum.or(z.literal('')).superRefine((val, ctx) => {
    if (!val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Grade level is required",
      });
    }
  }),

  // Educational Info
  schoolName: z.string().min(1, "School name is required"),
  educationalQualification: educationalQualificationEnum.or(z.literal('')).superRefine((val, ctx) => {
    if (!val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Educational qualification is required",
      });
    }
  }),
  teacherLicenseNumber: z.string().min(1, "Teacher license number is required"),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;

// Export the data for use in components
export const onboardingOptions = {
  professions: onboardingData.professions,
  referralSources: onboardingData.referralSources,
  subjects: onboardingData.subjects,
  gradeLevels: onboardingData.gradeLevels,
  educationalQualifications: onboardingData.educationalQualifications,
} as const;
