import { Lightbulb } from "lucide-react"
import type { CreateLessonPlanData } from "src/types/lessonPlan/lessonPlan"

interface AIPromptTabProps {
  aiPrompt: CreateLessonPlanData | null
}

export function AIPromptTab({ aiPrompt }: AIPromptTabProps) {
  return (
    <div className="bg-white shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        AI Prompt Details
      </h2>
      {aiPrompt && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Topic</h3>
            <p className="p-3 bg-slate-50 rounded-md">{aiPrompt.topic}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Additional Instructions</h3>
            <p className="p-3 bg-slate-50 rounded-md whitespace-pre-wrap">{aiPrompt.additionalInstructions}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Standards</h3>
            <p className="p-3 bg-slate-50 rounded-md">{aiPrompt.standards}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Output Language</h3>
            <p className="p-3 bg-slate-50 rounded-md">{aiPrompt.outputLanguage}</p>
          </div>
        </div>
      )}
    </div>
  )
} 