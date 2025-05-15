"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { KanbanBoard } from "./components/kanban-board";
import { useGetAllLessonPlansNoPagination, useUpdateLessonPlanStatus } from "@/hooks/lessonPlan/lessonPlan.hooks";
import { LessonPlanResponse, LessonPlanStatus } from "@/types/lessonPlan/lessonPlan";
import AllPlan from "../lesson-plan/all/page";

// Update the column definitions to use more subtle background colors
const COLUMNS = [
  {
    id: "DRAFT",
    title: "Need to Generate",
    color: "bg-white",
  },
  {
    id: "GENERATED",
    title: "Generated",
    color: "bg-white",
  },
  {
    id: "TAUGHT",
    title: "Taught",
    color: "bg-white",
  },
  {
    id: "AWAITING_ASSIGNMENT",
    title: "Awaiting Assignments",
    color: "bg-white",
  },
  {
    id: "COMPLETED",
    title: "Completed",
    color: "bg-white",
  },
];

export default function KanbanPage() {
  const { data: apiLessonPlans, isLoading } = useGetAllLessonPlansNoPagination();
  const {mutateAsync : updateLessonPlanStatus } = useUpdateLessonPlanStatus()
  const [lessonPlans, setLessonPlans] = useState<any[]>([]);

  // Transform API data to match the expected format for KanbanBoard
  useEffect(() => {
    if (apiLessonPlans) {
      const formattedPlans = apiLessonPlans.map((plan: LessonPlanResponse) => {
        // Try to parse the aiResponse to get subject and grade level
        let subject = "Subject";
        let grade = "Grade";
        
        try {
          const aiResponseObj = JSON.parse(plan.aiResponse);
          subject = aiResponseObj.lessonOverview?.subject || "Subject";
          grade = aiResponseObj.lessonOverview?.gradeLevel || "Grade";
        } catch (error) {
          console.error("Error parsing aiResponse:", error);
        }
        
        return {
          id: plan.id,
          title: plan.title,
          subject: subject,
          grade: grade,
          createdAt: plan.createdAt,
          status: plan.status
        };
      });
      
      setLessonPlans(formattedPlans);
    }
  }, [apiLessonPlans]);

  // Function to handle moving a lesson plan to a different status
  const handleStatusChange = (lessonPlanId: string, newStatus: LessonPlanStatus) => {
    console.log(`Moving lesson plan ${lessonPlanId} to ${newStatus}`);
    setLessonPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === lessonPlanId ? { ...plan, status: newStatus } : plan
      )
    );
    
    // Here you would typically call an API to update the status in the backend
    updateLessonPlanStatus({id: lessonPlanId, status : newStatus });
  };
  console.log({apiLessonPlans})
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
                <p className="text-sm text-muted-foreground">
                  Manage your lesson plans by status
                </p>
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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-muted-foreground">Loading lesson plans...</p>
          </div>
        ) : (
          <KanbanBoard
            columns={COLUMNS}
            lessonPlans={lessonPlans}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
}
