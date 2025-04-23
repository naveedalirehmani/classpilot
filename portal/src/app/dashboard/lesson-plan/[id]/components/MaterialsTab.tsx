import { Badge } from "@/components/ui/badge"
import { FileText, List } from "lucide-react"
import type { LessonPlan } from "src/types/lessonPlan/lessonPlan"
import { Card, SectionTitle } from "./common"

interface MaterialsTabProps {
  aiResponse: LessonPlan | null
}

export function MaterialsTab({ aiResponse }: MaterialsTabProps) {
  return (
    <section>
      <SectionTitle icon={<List className="h-5 w-5 text-blue-600" />}>Materials and Resources</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiResponse?.materialsAndResources?.map((material, index) => (
          <Card key={index}>
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-full ${
                  material.type === "Digital"
                    ? "bg-blue-100 text-blue-600"
                    : material.type === "Handout"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-emerald-100 text-emerald-600"
                }`}
              >
                {material.type === "Digital" ? (
                  <FileText className="h-5 w-5" />
                ) : material.type === "Handout" ? (
                  <FileText className="h-5 w-5" />
                ) : (
                  <List className="h-5 w-5" />
                )}
              </div>
              <div>
                <h4 className="font-medium mb-1">{material.name}</h4>
                <Badge variant="outline" className="mb-2">
                  {material.type}
                </Badge>
                {material.quantity && (
                  <p className="text-xs text-muted-foreground mb-1">Quantity: {material.quantity}</p>
                )}
                {material.preparation && (
                  <div className="mt-2">
                    <p className="text-xs font-medium">Preparation:</p>
                    <p className="text-xs text-muted-foreground">{material.preparation}</p>
                  </div>
                )}
                {material.alternativeOptions && material.alternativeOptions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium">Alternatives:</p>
                    <ul className="list-disc list-inside text-xs text-muted-foreground">
                      {material.alternativeOptions.map((option, i) => (
                        <li key={i}>{option}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {material.links && material.links.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium">Links:</p>
                    <ul className="space-y-1 mt-1">
                      {material.links.map((link, i) => (
                        <li key={i}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <FileText className="h-3 w-3" />
                            {link.description}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
} 