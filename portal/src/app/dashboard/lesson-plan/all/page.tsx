"use client"

import type React from "react"
import { useGetAllUserLessonPlans, useAddFavorite, useRemoveFavorite } from "src/hooks/lessonPlan/lessonPlan.hooks"
import { useRouter } from "next/navigation"
import { ROUTES } from "src/lib/routes"
import type { LessonPlanResponse } from "src/types/lessonPlan/lessonPlan"
import { LessonPlanCard, LessonPlanCardSkeleton, EmptyLessonPlans } from "./components/card"
import { LayoutGrid, List } from 'lucide-react'
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { LessonPlanPagination } from "./components/pagination"

function AllPlan() {
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(9)
  const { data: paginatedPlans, isLoading } = useGetAllUserLessonPlans(page, limit)
  const addFavorite = useAddFavorite()
  const removeFavorite = useRemoveFavorite()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    // Scroll to top when page changes
    window.scrollTo(0, 0)
  }

  const handleCardClick = (id: string) => {
    router.push(`${ROUTES.DASHBOARD}/${ROUTES.LESSON_PLAN}/${id}`)
  }

  const toggleFavorite = async (e: React.MouseEvent, plan: LessonPlanResponse) => {
    e.stopPropagation() // Prevent card click when clicking favorite button
    try {
      if (plan.isFavorite) {
        await removeFavorite.mutateAsync({ lessonPlanId: plan.id })
      } else {
        await addFavorite.mutateAsync({ lessonPlanId: plan.id })
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(limit).fill(0).map((_, index) => (
      <LessonPlanCardSkeleton key={`skeleton-${index}`} viewMode={viewMode} />
    ))
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Lesson Plans</h1>
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4">
        {isLoading ? (
          <div 
            className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "flex flex-col gap-4"
            }
          >
            {renderSkeletons()}
          </div>
        ) : paginatedPlans && paginatedPlans.data && paginatedPlans.data.length > 0 ? (
          <>
            <div 
              className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "flex flex-col gap-4"
              }
            >
              {paginatedPlans.data.map((plan) => (
                <LessonPlanCard 
                  key={plan.id} 
                  plan={plan} 
                  viewMode={viewMode}
                  onCardClick={handleCardClick} 
                  onToggleFavorite={toggleFavorite} 
                />
              ))}
            </div>
            
            {/* Pagination - always show regardless of page count */}
            <LessonPlanPagination
              currentPage={paginatedPlans.currentPage}
              totalPages={paginatedPlans.totalPages || 1}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyLessonPlans />
        )}
      </div>
    </div>
  )
}

export default AllPlan
