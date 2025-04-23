"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Check,
  ChevronsUpDown,
  User,
  Building,
  GraduationCap,
  Info,
  Save,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  onboardingOptions,
  onboardingSchema,
} from "@/schema/onboarding/onboarding.schema";
import type { OnboardingSchema } from "@/schema/onboarding/onboarding.schema";
import { useGetCurrentUser, useUpdateUser } from "@/hooks/user/user.hooks";
import Link from "next/link";
import { UnderConstruction } from "@/components/ui/under-construction";
import { ROUTES } from "@/lib/routes";

export default function ProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: userData } = useGetCurrentUser();
  console.log(userData);
  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      organization: userData?.organization || "",
      profession: userData?.profession || "",
      howDidYouHearAboutUs: userData?.howDidYouHearAboutUs || "",
      yearsOfExperience: userData?.yearsOfExperience || 0,
      subjectsTaught: userData?.subjectsTaught
        ? userData.subjectsTaught.split(",")
        : [],
      gradeLevel: userData?.gradeLevel || "",
      schoolName: userData?.schoolName || "",
      educationalQualification: userData?.educationalQualification || "",
      teacherLicenseNumber: userData?.teacherLicenseNumber || "",
    },
  });
  const { mutate: updateProfileMutation } = useUpdateUser();

  async function onSubmit(data: OnboardingSchema) {
    setIsSubmitting(true);

    try {
      // Simulate API call
      console.log("Form submitted:", data);
      updateProfileMutation({
        ...data,
        subjectsTaught: data.subjectsTaught.join(","),
      });
      // Show success message or redirect
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="bg-white border-b sticky top-0 z-10 py-4 px-6">
        <div className="flex items-center">
          <Link href={ROUTES.DASHBOARD}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="ml-4">
            <h1 className="text-3xl font-bold tracking-tight mt-0">
              Educator Profile
            </h1>
            <p className="text-muted-foreground m-0">
              Please fill out this form to make any changes to your profile.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column */}
                  <div className="lg:col-span-1 space-y-6">
                    <Card className="pt-0">
                      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg py-4">
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-emerald-500" />
                          Personal Information
                        </CardTitle>
                        <CardDescription>
                          Tell us about yourself and your role
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <FormField
                          control={form.control}
                          name="organization"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your school or organization"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                The name of your school, district, or
                                organization
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="profession"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Professional Role</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your role" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {onboardingOptions.professions.map(
                                    (profession) => (
                                      <SelectItem
                                        key={profession.value}
                                        value={profession.value}
                                      >
                                        {profession.label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Your primary role in education
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="howDidYouHearAboutUs"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>How did you hear about us?</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a referral source" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {onboardingOptions.referralSources.map(
                                    (source) => (
                                      <SelectItem
                                        key={source.value}
                                        value={source.value}
                                      >
                                        {source.label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Help us understand how you found our platform
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card className="pt-0">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg py-4">
                        <CardTitle className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-purple-500" />
                          Educational Information
                        </CardTitle>
                        <CardDescription>
                          Tell us about your educational background
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <FormField
                          control={form.control}
                          name="educationalQualification"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Educational Qualification</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your highest qualification" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {onboardingOptions.educationalQualifications.map(
                                    (qualification) => (
                                      <SelectItem
                                        key={qualification.value}
                                        value={qualification.value}
                                      >
                                        {qualification.label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Your highest educational qualification
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="teacherLicenseNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teacher License Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your license number"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Your professional teaching license number
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="pt-0">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-t-lg py-4">
                        <CardTitle className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-blue-500" />
                          Professional Information
                        </CardTitle>
                        <CardDescription>
                          Tell us about your teaching experience
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="schoolName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>School Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your school name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  The name of the school where you currently
                                  teach
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="yearsOfExperience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Years of Experience</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="50"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  How many years have you been teaching?
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="gradeLevel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Grade Level</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select grade level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {onboardingOptions.gradeLevels.map(
                                      (grade) => (
                                        <SelectItem
                                          key={grade.value}
                                          value={grade.value}
                                        >
                                          {grade.label}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  The primary grade level you teach
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="subjectsTaught"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Subjects Taught</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          "w-full justify-between",
                                          !field.value.length &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value.length > 0
                                          ? `${field.value.length} subject${
                                              field.value.length > 1 ? "s" : ""
                                            } selected`
                                          : "Select subjects"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandInput placeholder="Search subjects..." />
                                      <CommandList>
                                        <CommandEmpty>
                                          No subject found.
                                        </CommandEmpty>
                                        <CommandGroup className="max-h-64 overflow-auto">
                                          {onboardingOptions.subjects.map(
                                            (subject) => (
                                              <CommandItem
                                                key={subject.value}
                                                value={subject.value}
                                                onSelect={() => {
                                                  const currentValues = new Set(
                                                    field.value
                                                  );
                                                  if (
                                                    currentValues.has(
                                                      subject.value
                                                    )
                                                  ) {
                                                    currentValues.delete(
                                                      subject.value
                                                    );
                                                  } else {
                                                    currentValues.add(
                                                      subject.value
                                                    );
                                                  }
                                                  field.onChange(
                                                    Array.from(currentValues)
                                                  );
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    "mr-2 h-4 w-4",
                                                    field.value.includes(
                                                      subject.value
                                                    )
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                                {subject.label}
                                              </CommandItem>
                                            )
                                          )}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  Select all subjects that you teach
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50 border-slate-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Info className="h-5 w-5 text-blue-500" />
                          Privacy Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Your information will be used to personalize your
                          experience and improve our services. We respect your
                          privacy and will never share your information with
                          third parties without your consent.
                        </p>
                        <div className="flex flex-col space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                            <span>
                              Your data is encrypted and securely stored
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                            <span>
                              You can request a copy of your data at any time
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                            <span>
                              You can delete your account and all associated
                              data
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end border-t pt-6">
                        <Button
                          type="submit"
                          size="lg"
                          className="bg-emerald-600 hover:bg-emerald-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Updating Profile..."
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Profile Changes
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Manage your notification and display preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UnderConstruction />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account details and security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UnderConstruction />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
