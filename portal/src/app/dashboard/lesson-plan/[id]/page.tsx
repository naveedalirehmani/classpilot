"use client"

import type React from "react"
import { useParams } from "next/navigation"
import { useGetLessonPlan } from "src/hooks/lessonPlan/lessonPlan.hooks"
import type { CreateLessonPlanData, LessonPlan } from "src/types/lessonPlan/lessonPlan"
import {
  ArrowLeft,
  Download,
  Edit,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ROUTES } from "src/lib/routes"
import Link from "next/link"
import { useModalStore } from "@/store/modal.store"
import { ModalType } from "@/types/modal"
import { generateLessonPlanPDF } from "@/lib/utils"
import { useRef, useState } from "react"
import { createPDFFilename } from "@/lib/utils"
import LessonPlanPDFTemplate from "@/components/lesson-plan-pdf-template"
import { OverviewCards } from "./components/OverviewCards"
import { OverviewTab } from "./components/OverviewTab"
import { LessonContentTab } from "./components/LessonContentTab"
import { MaterialsTab } from "./components/MaterialsTab"
import { DifferentiationTab } from "./components/DifferentiationTab"
import { AIPromptTab } from "./components/AIPromptTab"

function LessonPlanDetails() {
  const { id } = useParams()
  const { data: lessonPlan, isLoading } = useGetLessonPlan(id as string)
  const openModal = useModalStore((state) => state.openModal)
  const [isPdfGenerating, setIsPdfGenerating] = useState(false)
  const pdfTemplateRef = useRef<HTMLDivElement>(null)

  const aiPrompt: CreateLessonPlanData | null = lessonPlan?.aiPrompt ? JSON.parse(lessonPlan.aiPrompt) : null
  const aiResponse: LessonPlan | null = lessonPlan?.aiResponse ? JSON.parse(lessonPlan.aiResponse) : null

  const handleDownloadPDF = async () => {
    if (!pdfTemplateRef.current) return

    try {
      setIsPdfGenerating(true)
      const filename = createPDFFilename(lessonPlan)
      await generateLessonPlanPDF(pdfTemplateRef.current, filename)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsPdfGenerating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-emerald-200 mb-4"></div>
          <div className="h-4 w-48 bg-slate-200 rounded mb-2.5"></div>
          <div className="h-3 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Hidden PDF template for generation */}
      <div className="hidden">
        <div ref={pdfTemplateRef}>
          <LessonPlanPDFTemplate lessonPlan={lessonPlan} aiResponse={aiResponse} aiPrompt={aiPrompt} />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="mx-auto py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={ROUTES.DASHBOARD}>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{lessonPlan?.title || "Lesson Plan"}</h1>
                <p className="text-sm text-muted-foreground">
                  Created {lessonPlan?.createdAt && new Date(lessonPlan.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleDownloadPDF}
                disabled={isPdfGenerating}
              >
                {isPdfGenerating ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></div>
                    <span className="hidden sm:inline">Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download PDF</span>
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button
                className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700"
                onClick={() => openModal(ModalType.EDIT_LESSON_PLAN, lessonPlan)}
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Overview Cards */}
        <OverviewCards aiPrompt={aiPrompt} aiResponse={aiResponse} />

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-white p-1 rounded-lg shadow-sm h-10">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 cursor-pointer"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 cursor-pointer"
            >
              Lesson Content
            </TabsTrigger>
            <TabsTrigger
              value="materials"
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 cursor-pointer"
            >
              Materials
            </TabsTrigger>
            <TabsTrigger
              value="differentiation"
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 cursor-pointer"
            >
              Differentiation
            </TabsTrigger>
            <TabsTrigger
              value="prompt"
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 cursor-pointer"
            >
              AI Prompt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab aiResponse={aiResponse} />
          </TabsContent>

          <TabsContent value="content">
            <LessonContentTab aiResponse={aiResponse} />
          </TabsContent>

          <TabsContent value="materials">
            <MaterialsTab aiResponse={aiResponse} />
          </TabsContent>

          <TabsContent value="differentiation">
            <DifferentiationTab aiResponse={aiResponse} />
          </TabsContent>

          <TabsContent value="prompt">
            <AIPromptTab aiPrompt={aiPrompt} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default LessonPlanDetails
