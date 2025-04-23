import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, FileText, Target } from "lucide-react"
import type { LessonPlan } from "src/types/lessonPlan/lessonPlan"
import { Card, SectionTitle } from "./common"

interface OverviewTabProps {
  aiResponse: LessonPlan | null
}

export function OverviewTab({ aiResponse }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Lesson Overview */}
        <section>
          <SectionTitle icon={<BookOpen className="h-5 w-5 text-emerald-600" />}>Lesson Overview</SectionTitle>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Title</h4>
                <p className="font-medium">{aiResponse?.lessonOverview?.title}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Subject</h4>
                <p className="font-medium">{aiResponse?.lessonOverview?.subject}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Grade Level</h4>
                <p className="font-medium">{aiResponse?.lessonOverview?.gradeLevel}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Duration</h4>
                <p className="font-medium">{aiResponse?.lessonOverview?.duration}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Instructor</h4>
                <p className="font-medium">{aiResponse?.lessonOverview?.instructor}</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Learning Objectives */}
        <section>
          <SectionTitle icon={<Target className="h-5 w-5 text-purple-600" />}>Learning Objectives</SectionTitle>
          <div className="space-y-4">
            {aiResponse?.learningObjectives?.map((objective, index) => (
              <Card key={index} highlight={index === 0}>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium mb-2">{objective.objective}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <Badge variant="outline" className="bg-purple-50">
                        {objective.bloomsTaxonomyLevel}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50">
                        {objective.assessmentMethod}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="space-y-8">
        {/* Curriculum Alignment */}
        <section>
          <SectionTitle icon={<FileText className="h-5 w-5 text-blue-600" />}>
            Curriculum Alignment
          </SectionTitle>
          <div className="space-y-3">
            {aiResponse?.curriculumAlignment?.standards?.map((standard, index) => (
              <Card key={index} className="p-4">
                <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200">{standard.code}</Badge>
                <p className="text-sm">{standard.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{standard.category}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Homework Summary */}
        {aiResponse?.homework && (
          <section>
            <SectionTitle icon={<Calendar className="h-5 w-5 text-amber-600" />}>Homework</SectionTitle>
            <Card className="bg-amber-50">
              <h4 className="font-medium mb-2">{aiResponse.homework.assignment.task}</h4>
              <p className="text-sm text-muted-foreground mb-3">{aiResponse.homework.assignment.purpose}</p>
              {aiResponse.homework.dueDate && (
                <div className="flex items-center gap-2 text-sm text-amber-700 mt-2">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {aiResponse.homework.dueDate}</span>
                </div>
              )}
            </Card>
          </section>
        )}
      </div>
    </div>
  )
} 