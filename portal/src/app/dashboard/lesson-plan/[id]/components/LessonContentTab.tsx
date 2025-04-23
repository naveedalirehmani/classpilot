import { Badge } from "@/components/ui/badge"
import { Clock, GraduationCap, Lightbulb, Layers, Target } from "lucide-react"
import type { LessonPlan } from "src/types/lessonPlan/lessonPlan"
import { Card, SectionTitle } from "./common"

interface LessonContentTabProps {
  aiResponse: LessonPlan | null
}

export function LessonContentTab({ aiResponse }: LessonContentTabProps) {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <SectionTitle icon={<Lightbulb className="h-5 w-5 text-amber-600" />}>Introduction</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card highlight>
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Lightbulb className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Hook Activity</h4>
                <p className="text-sm mb-3">{aiResponse?.lessonStructure?.introduction?.hook?.activity}</p>
                {aiResponse?.lessonStructure?.introduction?.hook?.duration && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{aiResponse.lessonStructure.introduction.hook.duration}</span>
                  </div>
                )}
                {aiResponse?.lessonStructure?.introduction?.hook?.materials && (
                  <div className="mt-3 bg-slate-50 p-3 rounded-md">
                    <p className="text-xs font-medium mb-1">Materials Needed:</p>
                    <ul className="list-disc list-inside text-xs text-muted-foreground">
                      {aiResponse.lessonStructure.introduction.hook.materials.map((material, i) => (
                        <li key={i}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {aiResponse?.lessonStructure?.introduction?.priorKnowledgeConnection && (
            <Card>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Layers className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Prior Knowledge Connection</h4>
                  <p className="text-sm mb-3">
                    {aiResponse.lessonStructure.introduction.priorKnowledgeConnection.activationStrategy}
                  </p>
                  {aiResponse.lessonStructure.introduction.priorKnowledgeConnection.connections && (
                    <div className="mt-3 bg-slate-50 p-3 rounded-md">
                      <p className="text-xs font-medium mb-1">Connections:</p>
                      <ul className="list-disc list-inside text-xs text-muted-foreground">
                        {aiResponse.lessonStructure.introduction.priorKnowledgeConnection.connections.map(
                          (connection, i) => (
                            <li key={i}>{connection}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Instruction */}
      <section>
        <SectionTitle icon={<GraduationCap className="h-5 w-5 text-emerald-600" />}>Instruction</SectionTitle>
        <div className="space-y-4">
          {aiResponse?.lessonStructure?.instruction?.teachingMethods?.map((method, index) => (
            <Card key={index} highlight={index === 0}>
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    index === 0
                      ? "bg-emerald-100 text-emerald-600"
                      : index === 1
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{method.method}</h4>
                    {method.duration && (
                      <Badge variant="outline" className="bg-slate-50">
                        <Clock className="h-3 w-3 mr-1" />
                        {method.duration}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm">{method.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Assessment */}
      {aiResponse?.lessonStructure?.assessment && (
        <section>
          <SectionTitle icon={<Target className="h-5 w-5 text-indigo-600" />}>Assessment</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiResponse.lessonStructure.assessment.formative && (
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  Formative
                </h4>
                <div className="space-y-3">
                  {aiResponse.lessonStructure.assessment.formative.map((item, index) => (
                    <Card key={index} className="border-l-4 border-blue-400">
                      <h5 className="font-medium mb-2">{item.method}</h5>
                      {item.timing && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <Clock className="h-3 w-3" />
                          <span>{item.timing}</span>
                        </div>
                      )}
                      {item.questions && (
                        <div className="mt-3 bg-slate-50 p-3 rounded-md">
                          <p className="text-xs font-medium mb-1">Key Questions:</p>
                          <ul className="list-disc list-inside text-xs text-muted-foreground">
                            {item.questions.map((q, i) => (
                              <li key={i}>{q}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {aiResponse.lessonStructure.assessment.summative && (
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                  Summative
                </h4>
                <div className="space-y-3">
                  {aiResponse.lessonStructure.assessment.summative.map((item, index) => (
                    <Card key={index} className="border-l-4 border-indigo-400">
                      <h5 className="font-medium mb-2">{item.method}</h5>
                      {item.description && <p className="text-sm mb-2">{item.description}</p>}
                      {item.criteria && (
                        <div className="mt-3 bg-slate-50 p-3 rounded-md">
                          <p className="text-xs font-medium mb-1">Success Criteria:</p>
                          <ul className="list-disc list-inside text-xs text-muted-foreground">
                            {item.criteria.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
} 