import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function HowItWorks() {
  const features = [
    {
      image: "pen.png",
      title: "Personalized editor",
      description: "Generate content that’s always relevant.",
    },
    {
      image: "notification.png",
      title: "Instant answers",
      description: "Ask any question about a team’s docs and projects.",
    },
    {
      image: "monk.png",
      title: "AI connectors beta",
      description: "Access info from Slack, Google Drive and more, right inside Notion.",
    },
  ]

  const steps = [
    {
      step: "01",
      title: "Input Your Requirements",
      description: "Specify your subject, grade level, learning objectives, and any specific requirements.",
    },
    {
      step: "02",
      title: "AI Generates Content",
      description: "Our AI delivers customized lesson plans, worksheets, and unit plans tailored to your specific needs.",
    },
    {
      step: "03",
      title: "Review and Customize",
      description: "Edit, refine, and personalize the generated content to perfectly match your teaching style.",
    },
  ]

  return (
    <>
      {/* Kanban Planning Board Section */}
      
    

      {/* How ClassPlanner Works Section */}
      <section id="how-it-works" className="pb-10 ">
        <div className="container mx-auto   max-w-6xl px-4">
          <h2 className="text-5xl font-bold text-center mb-16">How ClassPlanner Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <Card  key={item.step}>
                <CardHeader>
                  <div className="text-primary font-bold text-xl mb-2">{item.step}</div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
