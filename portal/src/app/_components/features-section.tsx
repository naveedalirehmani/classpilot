import FeatureItem from "./feature-item";

export default function FeaturesSection() {
  const features = [
    {
      title: "AI-Generated Lesson Plans",
      description:
        "Simply input your topic and grade level, and Class Pilot's AI will generate comprehensive lesson plans with objectives, activities, assessments, and resources.",
      features: [
        {
          image: "image.png",
          title: "Building blocks",
          description: "100+ content types to communicate any idea.",
        },
        {
          image: "at.png",
          title: "Collaborative",
          description: "Built for teams to share, suggest, and comment.",
        },
        {
          image: "monk.png",
          title: "AI-assisted",
          description: "Edit, draft, translate. Ask and AI will help.",
        },
      ],
      imageSrc: "/3.png",
      imageAlt: "AI Lesson Plan Generator",
    },
    {
      title: "Comprehensive Unit Planning",
      description:
        "Plan entire units with connected lesson plans, resources, and assessments. Ensure curriculum coherence and track progress.",
      features: [
        {
          image: "book.png",
          title: "Teamspaces",
          description: "Dedicated spaces for every team & project",
        },
        {
          image: "flok.png",
          title: "Integrations",
          description: "Connected to all your other tools..",
        },
        {
          image: "notification.png",
          title: "Just ask AI",
          description: "Trusted answers across your apps.",
        },
      ],
      imageSrc: "/1.png",
      imageAlt: "Unit Planning Tool ",
    },
    {
      title: "Kanban Planning Board",
      description:
        "Visualize your teaching workflow with our intuitive Kanban board. Track lessons from planning to completion and manage assignments.",
      features: [
        {
          image: "tdodcheck.png",
          title: "Tasks",
          description: "Tackle any project.",
        },
        {
          image: "clander.png",
          title: "Custom views",
          description: "View work as calendars, boards, and more.",
        },
        {
          image: "pen.png",
          title: "Automations",
          description: "Put tedious tasks on autopilot.",
        },
      ],
      imageSrc: "/2.png",
      imageAlt: "Kanban Planning Board",
    },
  ];

  return (
    <section id="features" className="container mx-auto py-10">
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
  );
}
