"use client"

import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { KanbanColumn } from "./kanban-column"
import { LessonPlanCard } from "./lesson-plan-card"

type LessonPlan = {
  id: string
  title: string
  subject: string
  grade: string
  createdAt: string
  status: string
}

type Column = {
  id: string
  title: string
  color: string
}

interface KanbanBoardProps {
  columns: Column[]
  lessonPlans: LessonPlan[]
  onStatusChange: (lessonPlanId: string, newStatus: string) => void
}

export function KanbanBoard({ columns, lessonPlans, onStatusChange }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  // Find the active lesson plan
  const activePlan = activeId ? lessonPlans.find((plan) => plan.id === activeId) : null

  // Configure sensors for drag and drop with better touch handling
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Require a more intentional drag to start
      activationConstraint: {
        distance: 5, // 5px of movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
  }

  // Custom collision detection that prioritizes columns
  const customCollisionDetection = (args: any) => {
    // First check for column intersections
    const columnCollisions = rectIntersection(args)
    
    // If we have column collisions, return those
    if (columnCollisions.length > 0) {
      // Filter to only include column IDs
      const columnIds = columns.map(col => col.id)
      const filteredCollisions = columnCollisions.filter(
        collision => columnIds.includes(collision.id as string)
      )
      
      if (filteredCollisions.length > 0) {
        return filteredCollisions
      }
    }
    
    // Fall back to pointer detection
    return pointerWithin(args)
  }

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      // Check if the over target is a column
      const isColumn = columns.some((column) => column.id === over.id)
      
      if (isColumn) {
        const newStatus = over.id as string
        console.log(`Moving lesson plan ${active.id} to ${newStatus}`)
        onStatusChange(active.id as string, newStatus)
      }
    }

    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
        {columns.map((column) => {
          // Filter lesson plans for this column
          const columnPlans = lessonPlans.filter((plan) => plan.status === column.id)

          return (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              lessonPlans={columnPlans}
            />
          )
        })}
      </div>

      {/* Drag overlay for the currently dragged item */}
      <DragOverlay>
        {activeId && activePlan ? (
          <div className="w-full opacity-80">
            <LessonPlanCard lessonPlan={activePlan} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
