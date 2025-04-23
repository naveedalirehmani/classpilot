"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, GraduationCap, BookOpen } from "lucide-react"

type LessonPlan = {
  id: string
  title: string
  subject: string
  grade: string
  createdAt: string
  status: string
}

interface LessonPlanCardProps {
  lessonPlan: LessonPlan
}

export function LessonPlanCard({ lessonPlan }: LessonPlanCardProps) {
  // Format the date
  const formattedDate = new Date(lessonPlan.createdAt).toLocaleDateString()

  // Get the appropriate badge color based on status
  const getBadgeColor = (status: string) => {
    switch (status) {
      case "need-to-generate":
        return "bg-slate-200 hover:bg-slate-300 text-slate-800"
      case "generated":
        return "bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
      case "taught":
        return "bg-blue-100 hover:bg-blue-200 text-blue-800"
      case "awaiting-assignments":
        return "bg-amber-100 hover:bg-amber-200 text-amber-800"
      case "completed":
        return "bg-green-100 hover:bg-green-200 text-green-800"
      default:
        return "bg-gray-100 hover:bg-gray-200 text-gray-800"
    }
  }

  // Add a function to get border color based on status
  const getBorderColor = (status: string) => {
    switch (status) {
      case "need-to-generate":
        return "#94a3b8" // slate-400
      case "generated":
        return "#10b981" // emerald-500
      case "taught":
        return "#3b82f6" // blue-500
      case "awaiting-assignments":
        return "#f59e0b" // amber-500
      case "completed":
        return "#22c55e" // green-500
      default:
        return "#cbd5e1" // slate-300
    }
  }

  // Add a visual indicator that the card is draggable
  return (
    <Card
      className="rounded-sm cursor-grab active:cursor-grabbing shadow-sm hover:shadow transition-shadow border-t-6"
      style={{
        borderTopColor: getBorderColor(lessonPlan.status),
      }}
    >
      <CardContent className="p-3">
        <div className="space-y-2">
          <h4 className="font-medium line-clamp-2">{lessonPlan.title}</h4>

          <div className="flex flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <BookOpen className="h-3 w-3" />
              <span>{lessonPlan.subject}</span>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <GraduationCap className="h-3 w-3" />
              <span>{lessonPlan.grade}</span>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="pt-1">
            <Badge className={getBadgeColor(lessonPlan.status)} variant="secondary">
              {lessonPlan.status
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
