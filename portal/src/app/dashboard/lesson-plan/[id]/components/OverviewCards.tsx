import { BookOpen, Clock, Target } from "lucide-react"
import type { CreateLessonPlanData, LessonPlan } from "src/types/lessonPlan/lessonPlan"
import { Card } from "./common"

interface OverviewCardsProps {
  aiPrompt: CreateLessonPlanData | null
  aiResponse: LessonPlan | null
}

export function OverviewCards({ aiPrompt, aiResponse }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="flex items-start gap-4">
        <div className="bg-emerald-100 p-3 rounded-full">
          <BookOpen className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-medium text-lg">{aiPrompt?.topic || "Topic"}</h3>
          <p className="text-sm text-muted-foreground">
            {aiResponse?.lessonOverview?.subject || "Subject"}
            {aiResponse?.lessonOverview?.gradeLevel && ` • ${aiResponse.lessonOverview.gradeLevel}`}
          </p>
        </div>
      </Card>

      <Card className="flex items-start gap-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Clock className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-lg">{aiResponse?.lessonOverview?.duration || "Duration"}</h3>
          <p className="text-sm text-muted-foreground">Estimated lesson time</p>
        </div>
      </Card>

      <Card className="flex items-start gap-4">
        <div className="bg-purple-100 p-3 rounded-full">
          <Target className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-medium text-lg">{aiResponse?.learningObjectives?.length || 0} Objectives</h3>
          <p className="text-sm text-muted-foreground">Learning targets</p>
        </div>
      </Card>
    </div>
  )
} 