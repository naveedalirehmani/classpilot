"use client";

import type React from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, BookOpen, Clock, SearchX } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "src/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "src/components/ui/skeleton";
import type { LessonPlanResponse } from "src/types/lessonPlan/lessonPlan";

interface LessonPlanCardProps {
  plan: LessonPlanResponse;
  viewMode: "grid" | "list";
  onCardClick: (id: string) => void;
  onToggleFavorite: (
    e: React.MouseEvent,
    plan: LessonPlanResponse
  ) => Promise<void>;
  isLoading?: boolean;
}

export function LessonPlanCardSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <Card className="rounded-sm w-full flex flex-row overflow-hidden py-0">
        <div className="flex-grow flex flex-col p-4">
          <div className="flex justify-between items-start mb-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-4/5 mb-2" />
          <div className="flex flex-wrap gap-1.5 mt-auto">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
        <div className="border-l flex flex-col justify-between p-4 bg-gray-50 dark:bg-gray-800 min-w-48">
          <Skeleton className="h-4 w-28 mb-auto" />
          <Skeleton className="h-4 w-28 mt-auto" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1.5 w-full">
          <Skeleton className="h-6 w-4/5" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-4/5 mb-3" />
        <div className="flex flex-wrap gap-1.5 mt-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t text-xs flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </CardFooter>
    </Card>
  );
}

export function EmptyLessonPlans() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 text-center">
      <SearchX className="h-16 w-16 text-gray-300 mb-4" />
      <h3 className="text-xl font-medium text-gray-900 mb-1">No lesson plans found</h3>
      <p className="text-gray-500 max-w-md">
        You haven&apos;t created any lesson plans yet. Start creating your first lesson plan to see it here.
      </p>
    </div>
  );
}

export function LessonPlanCard({
  plan,
  viewMode,
  onCardClick,
  onToggleFavorite,
  isLoading = false,
}: LessonPlanCardProps) {
  if (isLoading) {
    return <LessonPlanCardSkeleton viewMode={viewMode} />;
  }

  const aiResponse = JSON.parse(plan.aiPrompt);

  if (viewMode === "list") {
    return (
      <Card
        className="rounded-sm group w-full flex flex-row overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300 cursor-pointer py-0"
        onClick={() => onCardClick(plan.id)}
      >
        <div className="flex-grow flex flex-col p-4">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
              {plan.title}
            </CardTitle>
            <button
              className="relative flex items-center justify-center h-8 w-8 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={(e) => onToggleFavorite(e, plan)}
              aria-label={
                plan.isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={`h-5 w-5 transition-all ${
                  plan.isFavorite
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                }`}
              />
              <span className="sr-only">
                {plan.isFavorite ? "Remove from favorites" : "Add to favorites"}
              </span>
            </button>
          </div>

          {aiResponse?.additionalInstructions && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
              {aiResponse.additionalInstructions}
            </p>
          )}

          {aiResponse?.tags && aiResponse.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {aiResponse.tags.slice(0, 3).map((tag: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-gray-50 dark:bg-gray-800"
                >
                  {tag}
                </Badge>
              ))}
              {aiResponse.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-gray-50 dark:bg-gray-800"
                >
                  +{aiResponse.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="border-l flex flex-col justify-between p-4 bg-gray-50 dark:bg-gray-800 min-w-48">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            <span>
              {formatDistanceToNow(new Date(plan.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-auto">
            <BookOpen className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            <span>View details</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="group h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300 hover:translate-y-[-2px] cursor-pointer"
      onClick={() => onCardClick(plan.id)}
    >
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1.5">
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {plan.title}
          </CardTitle>
        </div>
        <button
          className="relative flex items-center justify-center h-8 w-8 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={(e) => onToggleFavorite(e, plan)}
          aria-label={
            plan.isFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <Heart
            className={`h-5 w-5 transition-all ${
              plan.isFavorite
                ? "fill-red-500 text-red-500 scale-110"
                : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            }`}
          />
          <span className="sr-only">
            {plan.isFavorite ? "Remove from favorites" : "Add to favorites"}
          </span>
        </button>
      </CardHeader>

      <CardContent className="flex-grow pb-2">
        {aiResponse?.additionalInstructions && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-3">
            {aiResponse.additionalInstructions}
          </p>
        )}

        {aiResponse?.tags && aiResponse.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {aiResponse.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-gray-50 dark:bg-gray-800"
              >
                {tag}
              </Badge>
            ))}
            {aiResponse.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-gray-50 dark:bg-gray-800"
              >
                +{aiResponse.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 border-t text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
          <span>
            {formatDistanceToNow(new Date(plan.createdAt), { addSuffix: true })}
          </span>
        </div>
        <div className="flex items-center">
          <BookOpen className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
          <span>View details</span>
        </div>
      </CardFooter>
    </Card>
  );
}
