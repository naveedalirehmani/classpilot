import FeatureItem from "./feature-item"
import { Separator } from "@/components/ui/separator"

export default function FeaturesSection() {
  const features = [
    {
      title: "AI-Generated Lesson Plans",
      description:
        "Simply input your topic and grade level, and ClassPlanner's AI will generate comprehensive lesson plans with objectives, activities, assessments, and resources.",
      features: ["Aligned with curriculum standards", "Customizable templates", "Save hours of planning time"],
      imageSrc: "/create.png",
      imageAlt: "AI Lesson Plan Generator",
    },
    // {
    //   title: "Worksheet Generator",
    //   description:
    //     "Create engaging, curriculum-aligned worksheets in seconds. Choose from various question types, difficulty levels, and formats to meet your students' needs.",
    //   features: [
    //     "Multiple formats (PDF, Word, Google Docs)",
    //     "Differentiated learning options",
    //     "Answer keys included",
    //   ],
    //   imageSrc: "/placeholder.svg?height=500&width=700",
    //   imageAlt: "Worksheet Generator",
    // },
    {
      title: "Comprehensive Unit Planning",
      description:
        "Plan entire units with connected lesson plans, resources, and assessments. Ensure curriculum coherence and track progress throughout the unit.",
      features: ["Scope and sequence planning", "Integrated assessment tools", "Resource management"],
      imageSrc: "/view.png",
      imageAlt: "Unit Planning Tool",
    },
    {
      title: "Kanban Planning Board",
      description:
        "Visualize your teaching workflow with our intuitive Kanban board. Track lessons from planning to completion and manage assignments all in one place.",
      features: ["Visual workflow management", "Track lesson status", "Organize by class, subject, or date"],
      imageSrc: "/kanban.png",
      imageAlt: "Kanban Planning Board",
    },
  ]

  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-6">Build your classroom curriculum with AI</h2>
        <p className="text-xl text-gray-600">
          ClassPlanner combines AI-powered content generation with intuitive organization tools to transform how you
          plan and teach.
        </p>
      </div>

      <Separator className="my-8" />

      {features.map((feature, index) => (
        <div key={index}>
          <FeatureItem
            title={feature.title}
            description={feature.description}
            features={feature.features}
            imageSrc={feature.imageSrc}
            imageAlt={feature.imageAlt}
          />
        </div>
      ))}
    </section>
  )
}
