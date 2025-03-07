"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, Lightbulb, Globe, Sparkles } from "lucide-react"
import Image from "next/image"

export default function LessonPlan() {
  const [activeTab, setActiveTab] = useState("topic")

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-12">
        <Button variant="ghost" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex justify-center">
          <div className="w-14 h-14 bg-green-50 rounded-md flex items-center justify-center">
            <Image src="/icons/greenfile.svg" alt="green file" width={20} height={20}  />
          </div>
        </div>

        <Button variant="ghost" className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200">
        <Image src="/icons/bulb.svg" alt="green file" width={20} height={20}  />
          Ideas
        </Button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Lesson Plan</h1>
        <p className="text-gray-600">Create a lesson plan from any source - topic, text.</p>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="topic" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto bg-gray-100 rounded-full p-1">
            <TabsTrigger value="topic" className="rounded-full data-[state=active]:bg-white flex items-center gap-2">
            <Image src="/icons/bulb.svg" alt="green file" width={20} height={20}  />
              Topic
            </TabsTrigger>
            <TabsTrigger value="text" className="rounded-full data-[state=active]:bg-white flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Text
            </TabsTrigger>
            <TabsTrigger value="webpage" className="rounded-full data-[state=active]:bg-white flex items-center gap-2">
            <Image src="/icons/globe.svg" alt="green file" width={20} height={20}  />
              Webpage
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">Pro</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="topic" className="block text-sm font-medium">
            Your topic
          </label>
          <Input id="topic" placeholder="Enter topic. eg: Solar system, Photosynthesis" className="w-full" />
        </div>

        <div className="space-y-2">
          <label htmlFor="instructions" className="block text-sm font-medium">
            Additional instructions (optional)
          </label>
          <Textarea
            id="instructions"
            placeholder="Specify any additional requirements, such as student level etc."
            className="min-h-[150px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="standards" className="block text-sm font-medium">
              Standards (optional)
            </label>
            <Input id="standards" placeholder="NGSS, NYS standards etc." className="w-full" />
          </div>

          <div className="space-y-2">
            <label htmlFor="language" className="block text-sm font-medium">
              Output language
            </label>
            <Input id="language" defaultValue="English" className="w-full" />
          </div>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
          <Image src="/icons/stairs.svg" width={20} height={20} alt="star" className="h-5 w-5 mr-2" />
          Generate lesson plan
        </Button>
      </form>
    </div>
  )
}

