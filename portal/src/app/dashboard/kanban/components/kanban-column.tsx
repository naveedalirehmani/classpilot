"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableLessonPlan } from "./sortable-lesson-plan"

type LessonPlan = {
  id: string
  title: string
  subject: string
  grade: string
  createdAt: string
  status: string
}

interface KanbanColumnProps {
  id: string
  title: string
  color: string
  lessonPlans: LessonPlan[]
}

export function KanbanColumn({ id, title, color, lessonPlans }: KanbanColumnProps) {
  // Make the entire column a droppable area
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  // Get the IDs for SortableContext
  const lessonPlanIds = lessonPlans.map((plan) => plan.id)

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col h-[calc(100vh-12rem)] border ${color} ${
        isOver ? "ring-2 ring-emerald-500" : ""
      }`}
      style={{ position: "relative" }}
    >
      <div className="p-3 border-b font-medium">
        <h3 className="text-center">{title}</h3>
        <div className="text-xs text-muted-foreground mt-1 text-center">
          {lessonPlans.length} lesson plan{lessonPlans.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* This div should take up the full height and be scrollable */}
      <div className="flex-1 p-2 overflow-y-auto">
        {/* Create an absolutely positioned div that covers the entire content area */}
        <div className="absolute inset-0 top-[53px] pointer-events-none" />
        
        <SortableContext items={lessonPlanIds} strategy={verticalListSortingStrategy}>
          {lessonPlans.length > 0 ? (
            <div className="space-y-2">
              {lessonPlans.map((plan) => (
                <SortableLessonPlan key={plan.id} lessonPlan={plan} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground italic">
              No lesson plans
            </div>
          )}
        </SortableContext>
      </div>

      {/* Add an invisible overlay to ensure the entire column is droppable */}
      {isOver && (
        <div className="absolute inset-0 bg-emerald-50 bg-opacity-20 pointer-events-none" aria-hidden="true" />
      )}
    </div>
  )
}
