import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
      description: "Our AI creates detailed lesson plans, worksheets, or unit plans based on your specifications.",
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
      <section id="kanban-board " className="py-10  mx-auto max-w-6xl">
        <div className="container px-4">
          <div className="flex gap-12">
            {/* Left side - Heading and description */}
            <div className="lg:col-span-1">
              <h2 className="text-5xl font-bold mb-4 md:w-[500px]">How ClassPlanner Works</h2>
              <p className="text-gray-600">
                Visualize your teaching workflow with our intuitive Kanban board. Track lessons from planning to
                completion and manage assignments all in one place.
              </p>
            </div>

            {/* Right side - Feature cards */}
            <div className="lg:col-span-3 ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="mb-2 flex justify-center mb-2">
                      <img src={`/${feature.image}`} alt={feature.title} className="h-20 w-20" />
                    </div>
                    <h3 className="text-lg font-semibold text-center ">{feature.title}</h3>
                    <p className="text-gray-600 text-center">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How ClassPlanner Works Section */}
      <section id="how-it-works" className="py-20 ">
        <div className="container mx-auto   max-w-6xl px-4">
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
    </>
  )
}
