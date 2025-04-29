import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function HowItWorks() {
    const steps = [
      {
        step: "01",
        title: "Input Your Requirements",
        description: "Specify your subject, grade level, learning objectives, and any specific requirements.",
      },
      {
        step: "02",
        title: "AI Generates Content",
        description: "Our AI creates detailed lesson plans, worksheets, or unit plans based on your specifications.",
      },
      {
        step: "03",
        title: "Review and Customize",
        description: "Edit, refine, and personalize the generated content to perfectly match your teaching style.",
      },
    ]
  
    return (
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How ClassPlanner Works</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <Card key={item.step}>
                <CardHeader>
                  <div className="text-indigo-600 font-bold text-xl mb-2">{item.step}</div>
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
    )
  }
  