"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/routes"
import Link from "next/link"
import { KanbanBoard } from "./components/kanban-board"

// Mock data for demonstration
const MOCK_LESSON_PLANS = [
  {
    id: "1",
    title: "Introduction to Photosynthesis",
    subject: "Biology",
    grade: "8th Grade",
    createdAt: new Date("2023-10-15").toISOString(),
    status: "need-to-generate",
  },
  {
    id: "2",
    title: "Algebraic Expressions",
    subject: "Mathematics",
    grade: "7th Grade",
    createdAt: new Date("2023-10-18").toISOString(),
    status: "generated",
  },
  {
    id: "3",
    title: "World War II Overview",
    subject: "History",
    grade: "10th Grade",
    createdAt: new Date("2023-10-10").toISOString(),
    status: "taught",
  },
  {
    id: "4",
    title: "Chemical Reactions",
    subject: "Chemistry",
    grade: "9th Grade",
    createdAt: new Date("2023-10-05").toISOString(),
    status: "awaiting-assignments",
  },
  {
    id: "5",
    title: "Shakespeare's Macbeth",
    subject: "Literature",
    grade: "11th Grade",
    createdAt: new Date("2023-09-28").toISOString(),
    status: "completed",
  },
  {
    id: "6",
    title: "Ecosystems and Biodiversity",
    subject: "Environmental Science",
    grade: "8th Grade",
    createdAt: new Date("2023-10-12").toISOString(),
    status: "generated",
  },
  {
    id: "7",
    title: "Fractions and Decimals",
    subject: "Mathematics",
    grade: "6th Grade",
    createdAt: new Date("2023-10-20").toISOString(),
    status: "need-to-generate",
  },
]

// Update the column definitions to use more subtle background colors
const COLUMNS = [
  {
    id: "need-to-generate",
    title: "Need to Generate",
    color: "bg-white",
  },
  {
    id: "generated",
    title: "Generated",
    color: "bg-white",
  },
  {
    id: "taught",
    title: "Taught",
    color: "bg-white",
  },
  {
    id: "awaiting-assignments",
    title: "Awaiting Assignments",
    color: "bg-white",
  },
  {
    id: "completed",
    title: "Completed",
    color: "bg-white",
  },
]

export default function KanbanPage() {
  const [lessonPlans, setLessonPlans] = useState(MOCK_LESSON_PLANS)

  // Function to handle moving a lesson plan to a different status
  const handleStatusChange = (lessonPlanId: string, newStatus: string) => {
    console.log(`Moving lesson plan ${lessonPlanId} to ${newStatus}`)
    setLessonPlans((prevPlans) =>
      prevPlans.map((plan) => (plan.id === lessonPlanId ? { ...plan, status: newStatus } : plan)),
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
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
                <h1 className="text-2xl font-bold">Lesson Plan Kanban</h1>
                <p className="text-sm text-muted-foreground">Manage your lesson plans by status</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  // This would open your create lesson plan modal
                  // Using the same pattern as in your example code
                }}
              >
                Create Lesson Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4 px-4">
        <KanbanBoard columns={COLUMNS} lessonPlans={lessonPlans} onStatusChange={handleStatusChange} />
      </div>
    </div>
  )
}
