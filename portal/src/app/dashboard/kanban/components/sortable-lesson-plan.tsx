"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { LessonPlanCard } from "./lesson-plan-card"
import type { CSSProperties } from "react"

type LessonPlan = {
  id: string
  title: string
  subject: string
  grade: string
  createdAt: string
  status: string
}

interface SortableLessonPlanProps {
  lessonPlan: LessonPlan
}

export function SortableLessonPlan({ lessonPlan }: SortableLessonPlanProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lessonPlan.id,
    data: {
      type: "lesson-plan",
      lessonPlan,
    },
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative" as const, // Ensure z-index works
    zIndex: 10, // Give cards a higher z-index
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-manipulation">
      <LessonPlanCard lessonPlan={lessonPlan} />
    </div>
  )
}
