"use client";

import type React from "react";
import {
  useGetAllFavorites,
  useRemoveFavorite,
} from "src/hooks/lessonPlan/lessonPlan.hooks";
import { useRouter } from "next/navigation";
import { ROUTES } from "src/lib/routes";
import type { LessonPlanResponse } from "src/types/lessonPlan/lessonPlan";
import { FavoritePlanCard } from "./components/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { useState } from "react";

function FavoritePlans() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const router = useRouter();
  const { data: allPlans } = useGetAllFavorites();
  const removeFavorite = useRemoveFavorite();

  const handleCardClick = (id: string) => {
    router.push(`${ROUTES.DASHBOARD}/${ROUTES.LESSON_PLAN}/${id}`);
  };

  const handleRemoveFavorite = async (
    e: React.MouseEvent,
    plan: LessonPlanResponse
  ) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    try {
      await removeFavorite.mutateAsync({ lessonPlanId: plan.id });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Lesson Plans</h1>
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) =>
              value && setViewMode(value as "grid" | "list")
            }
          >
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
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {allPlans?.map((plan) => (
            <FavoritePlanCard
              key={plan.id}
              plan={plan}
              viewMode={viewMode}
              onCardClick={handleCardClick}
              onToggleFavorite={handleRemoveFavorite}
            />
          ))}
        </div>

        {!allPlans?.length && (
          <div className="text-center text-gray-500 mt-8">
            No lesson plans found
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritePlans;
