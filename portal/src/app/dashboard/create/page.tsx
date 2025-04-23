"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ROUTES } from "src/lib/routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useCreateLessonPlan } from "src/hooks/lessonPlan/lessonPlan.hooks";
import {
  ArrowLeft,
  BookOpen,
  Languages,
  Lightbulb,
  Award,
  Loader2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  additionalInstructions: z
    .string()
    .min(1, "Additional instructions are required"),
  standards: z.string().min(1, "Standards are required"),
  outputLanguage: z.string().min(1, "Output language is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "Forces and Motion: Newton's Laws in Action",
      additionalInstructions:
        "Include real-world examples (like seatbelts, sports, or roller coasters) to explain Newton’s Laws. Design an interactive demo using toy cars and ramps to illustrate motion and force. Provide vocabulary terms and include discussion questions to relate physics to everyday life.",
      standards:
        "NGSS MS-PS2-2: Plan an investigation to provide evidence that the change in an object’s motion depends on the sum of the forces on the object and the mass of the object.",
      outputLanguage: "English",
    },
  });

  const { mutate: createLessonPlan, isPending } = useCreateLessonPlan();

  const onSubmit = (data: FormValues) => {
    createLessonPlan(data);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="mx-auto py-4 px-6 flex justify-between bg-white items-center">
        <div className="flex items-center">
          <Link href={ROUTES.DASHBOARD}>
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Create Lesson Plan
            </h1>
            <p className="text-muted-foreground mt-2 text-sm font-normal">
              Fill in the details below to generate a comprehensive lesson plan
              tailored to your needs.
            </p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Step 1 of 2: Create Lesson Plan
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Card className="border-none shadow-lg pt-0">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 py-4">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-emerald-600" />
                  Create Lesson Plan
                </CardTitle>
                <CardDescription>
                  Our AI will create a detailed lesson plan based on your
                  specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-amber-500" />
                            Topic
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your lesson topic"
                              className="border-slate-300 focus-visible:ring-emerald-500"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The main subject of your lesson plan
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-blue-500" />
                            Additional Instructions
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter any additional instructions or requirements"
                              className="min-h-32 border-slate-300 focus-visible:ring-emerald-500"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Include specific activities, materials, or teaching
                            approaches you&#39;d like to incorporate
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="standards"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-purple-500" />
                              Standards
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter applicable standards"
                                className="border-slate-300 focus-visible:ring-emerald-500"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Educational standards this lesson should align
                              with
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="outputLanguage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Languages className="h-4 w-4 text-green-500" />
                              Output Language
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter desired output language"
                                className="border-slate-300 focus-visible:ring-emerald-500"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Language in which the lesson plan should be
                              generated
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator className="my-6" />

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating Your Lesson Plan...
                        </>
                      ) : (
                        "Generate Lesson Plan"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground rounded-b-lg">
                <p>
                  Your lesson plan will be generated in seconds and ready for
                  customization.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <Card>
              <CardHeader>
                <CardTitle>Example Lesson Plans</CardTitle>
                <CardDescription>
                  Browse these examples for inspiration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium">The Water Cycle (Grade 3-5)</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A hands-on lesson with experiments demonstrating
                      evaporation, condensation, and precipitation.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium">
                      Introduction to Fractions (Grade 2-4)
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Visual and tactile activities to help students understand
                      basic fraction concepts.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium">Ancient Egypt (Grade 6-8)</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A multi-day unit exploring Egyptian culture,
                      hieroglyphics, and pyramid construction.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <Card>
              <CardHeader>
                <CardTitle>Tips for Effective Lesson Plans</CardTitle>
                <CardDescription>
                  Follow these guidelines to create more engaging lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="bg-emerald-100 text-emerald-800 p-1 rounded-full mt-0.5">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <span>
                      Be specific about learning objectives and outcomes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-emerald-100 text-emerald-800 p-1 rounded-full mt-0.5">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <span>
                      Include a mix of activities for different learning styles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-emerald-100 text-emerald-800 p-1 rounded-full mt-0.5">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <span>
                      Consider adding assessment methods to measure
                      understanding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-emerald-100 text-emerald-800 p-1 rounded-full mt-0.5">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <span>
                      Specify time allocations for different parts of the lesson
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-emerald-100 text-emerald-800 p-1 rounded-full mt-0.5">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <span>
                      Include differentiation strategies for diverse learners
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
