import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Input Your Requirements",
      description:
        "Specify your subject, grade level, learning objectives, and any specific requirements.",
    },
    {
      step: "02",
      title: "AI Generates Content",
      description:
        "Our AI delivers customized lesson plans, worksheets, and unit plans tailored to your specific needs.",
    },
    {
      step: "03",
      title: "Review and Customize",
      description:
        "Edit, refine, and personalize the generated content to perfectly match your teaching style.",
    },
  ];

  return (
    <>
      {/* Kanban Planning Board Section */}

      {/* How Class Pilot Works Section */}
      <section id="how-it-works" className="">
        <div className="container mx-auto  max-w-6xl px-4">
          <h2 className="text-3xl sm:text-5xl font-bold w-full leading-tight pb-4">
            How Class Pilot Works
          </h2>
          <p className="text-muted-foreground pb-10">
            Start by sharing your teaching goals, then let Class Pilot create
            and customize content to make lesson planning easy
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <Card key={item.step}>
                <CardHeader>
                  <div className="text-primary font-bold text-xl mb-2">
                    {item.step}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
