import Link from "next/link";
import { ArrowRight, FileText, LayoutGrid, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="container mx-auto max-w-6xl  px-4 text-center font-lato">
      <div className="container mx-auto px-4 pt-24 ">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
        {/* Image on the left */}
        <div className="w-full md:w-1/2 py-16 flex justify-center md:justify-start">
          <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl overflow-hidden ">
            <Image
              src="/video.png"
              alt="Classroom planning tool interface"
              width={300}
              height={100}
              className="md:w-[400px] object-cover"
              priority
            />
            <div className="absolute inset-0 pointer-events-none"></div>
          </div>
        </div>

        {/* Text content on the right */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Plan perfect lessons, together.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl">
            Capture your teaching ideas, generate AI-powered lesson plans, and organize your curriculum with the
            ultimate classroom planning tool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-6">
            <Button asChild size="lg" className="text-lg">
              <Link href="/signup">
                Get started for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="#demo">See how it works</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
      {/* Feature Icons Grid - Similar to Notion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-24 max-w-5xl mx-auto my-">
        <div className="flex flex-col items-center">
          <div className="rounded-full border border-gray-200 p-4 mb-4">
            <FileText className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">AI-powered planning</h3>
          <p className="text-gray-600 text-center">
            Generate lesson plans, worksheets, and unit plans in seconds.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="rounded-full border-2 border-gray-200 p-4 mb-4">
            <LayoutGrid className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Kanban organization</h3>
          <p className="text-gray-600 text-center">
            Track lessons from planning to completion with visual boards.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="rounded-full border-2 border-gray-200 p-4 mb-4">
            <BookOpen className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Curriculum tools</h3>
          <p className="text-gray-600 text-center">
            Align with standards and build coherent teaching sequences.
          </p>
        </div>
      </div>

      {/* Screenshot Display - Similar to Notion */}
      <div className="bg-amber-100 rounded-xl p-8 py-6 mt-40  mb-12 relative">
        <Badge
          variant="outline"
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2"
        >
          See ClassPlanner in action
        </Badge>
        <div className="flex justify-center">
          <div className="relative flex -ml-10">
            {/* First Card */}
            <Card className="p-4 w-64 z-10 -mr-6 transform -rotate-3">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex justify-center mb-2">
                <FileText className="h-10 w-10 text-red-500" />
              </div>
              <CardHeader className="p-0">
                <h4 className="text-xl font-bold text-center mb-2">
                  Lesson Plan
                </h4>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-gray-600">
                  In today&apos;s math lesson, students will learn about
                  fractions through interactive activities and visual aids...
                </p>
              </CardContent>
            </Card>

            {/* Second Card */}
            <Card className="p-4 w-72 z-20">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex justify-center mb-2">
                <LayoutGrid className="h-10 w-10 text-indigo-500" />
              </div>
              <CardHeader className="p-0">
                <h4 className="text-xl font-bold text-center mb-2">
                  Kanban Board
                </h4>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                <div className="bg-gray-100 p-2 rounded text-sm">
                  <div className="font-medium">To Plan</div>
                  <div className="text-xs text-gray-500">3 lessons</div>
                </div>
                <div className="bg-gray-100 p-2 rounded text-sm">
                  <div className="font-medium">In Progress</div>
                  <div className="text-xs text-gray-500">2 lessons</div>
                </div>
                <div className="bg-gray-100 p-2 rounded text-sm">
                  <div className="font-medium">Completed</div>
                  <div className="text-xs text-gray-500">8 lessons</div>
                </div>
              </CardContent>
            </Card>

            {/* Third Card */}
            <Card className="p-4 w-64 z-10 -ml-6 transform rotate-3">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex justify-center mb-2">
                <BookOpen className="h-10 w-10 text-blue-500" />
              </div>
              <CardHeader className="p-0">
                <h4 className="text-xl font-bold text-center mb-2">
                  Unit Plan
                </h4>
              </CardHeader>
              <CardContent className="p-0 space-y-2 text-sm">
                <div className="font-medium">Objective</div>
                <p className="text-xs text-gray-600">
                  Students will understand the concept of fractions and their
                  applications.
                </p>
                <div className="font-medium mt-2">Key lessons</div>
                <ul className="text-xs text-gray-600 list-disc pl-4">
                  <li>Introduction to fractions</li>
                  <li>Comparing fractions</li>
                  <li>Adding fractions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
