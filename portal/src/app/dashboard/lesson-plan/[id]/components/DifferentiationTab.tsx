import { Calendar, FileText, Users } from "lucide-react"
import type { LessonPlan } from "src/types/lessonPlan/lessonPlan"
import { Card, SectionTitle } from "./common"

interface DifferentiationTabProps {
  aiResponse: LessonPlan | null
}

export function DifferentiationTab({ aiResponse }: DifferentiationTabProps) {
  return (
    <>
      {aiResponse?.differentiation && (
        <section>
          <SectionTitle icon={<Users className="h-5 w-5 text-purple-600" />}>
            Differentiation Strategies
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiResponse.differentiation.advancedLearners && (
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  Advanced Learners
                </h4>
                <div className="space-y-3">
                  {aiResponse.differentiation.advancedLearners.map((item, index) => (
                    <Card key={index} className="border-l-4 border-emerald-400">
                      <h5 className="font-medium mb-2">{item.strategy}</h5>
                      {item.activities && (
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                          {item.activities.map((activity, i) => (
                            <li key={i}>{activity}</li>
                          ))}
                        </ul>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {aiResponse.differentiation.strugglingLearners && (
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  Struggling Learners
                </h4>
                <div className="space-y-3">
                  {aiResponse.differentiation.strugglingLearners.map((item, index) => (
                    <Card key={index} className="border-l-4 border-amber-400">
                      <h5 className="font-medium mb-2">{item.support}</h5>
                      {item.scaffolding && (
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                          {item.scaffolding.map((scaffold, i) => (
                            <li key={i}>{scaffold}</li>
                          ))}
                        </ul>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {aiResponse.differentiation.accommodations && (
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  Accommodations
                </h4>
                <div className="space-y-3">
                  {aiResponse.differentiation.accommodations.map((item, index) => (
                    <Card key={index} className="border-l-4 border-blue-400">
                      <h5 className="font-medium mb-2">{item.type}</h5>
                      {item.description && <p className="text-sm mb-2">{item.description}</p>}
                      {item.implementation && (
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                          {item.implementation.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Homework Section */}
      {aiResponse?.homework && (
        <section className="mt-8">
          <SectionTitle icon={<Calendar className="h-5 w-5 text-amber-600" />}>Homework Assignment</SectionTitle>
          <Card className="bg-gradient-to-r from-amber-50 to-amber-100/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-lg mb-3">{aiResponse.homework.assignment.task}</h4>
                <p className="text-sm text-muted-foreground mb-4">{aiResponse.homework.assignment.purpose}</p>
                {aiResponse.homework.dueDate && (
                  <div className="flex items-center gap-2 text-sm text-amber-700 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {aiResponse.homework.dueDate}</span>
                  </div>
                )}
                {aiResponse.homework.assignment.instructions && (
                  <div>
                    <h5 className="text-sm font-medium mb-2">Instructions:</h5>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {aiResponse.homework.assignment.instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                {aiResponse.homework.resources && aiResponse.homework.resources.length > 0 && (
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="text-sm font-medium mb-3">Resources:</h5>
                    <ul className="space-y-2">
                      {aiResponse.homework.resources.map((resource, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">{resource.name}</p>
                            {resource.type && <p className="text-xs text-muted-foreground">{resource.type}</p>}
                            {resource.access && <p className="text-xs text-blue-600">{resource.access}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </section>
      )}
    </>
  )
} 