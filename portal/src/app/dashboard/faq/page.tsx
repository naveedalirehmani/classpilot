"use client";

import {  BookOpen, Zap, CreditCard, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    icon: CreditCard,
    title: "Billing & Subscriptions",
    description:
      "Questions about pricing, payments, and subscription management",
    faqs: [
      {
        question: "How does the billing cycle work?",
        answer:
          "You can choose between monthly or yearly billing cycles. Yearly subscriptions come with a 15% discount compared to monthly payments. Your subscription will automatically renew at the end of each billing period unless cancelled.",
      },
      {
        question: "Can I change my plan later?",
        answer:
          "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the change takes effect immediately. When downgrading, the change will take effect at the end of your current billing period.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For yearly subscriptions, we can also accommodate purchase orders from educational institutions.",
      },
      {
        question: "Is there a refund policy?",
        answer:
          "Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with your subscription, contact our support team within 14 days of purchase for a full refund.",
      },
    ],
  },
  {
    icon: BookOpen,
    title: "Lesson Plans",
    description: "Information about creating and managing lesson plans",
    faqs: [
      {
        question: "What happens to my lesson plans if I downgrade?",
        answer:
          "Your existing lesson plans will remain accessible, but you may be limited in creating new ones based on your new plan's restrictions. Premium features within existing plans may become inactive.",
      },
      {
        question: "Can I export my lesson plans?",
        answer:
          "Yes, depending on your subscription tier. Basic and Premium plans allow exports to multiple formats including PDF, Word, and Google Docs. Free plans have limited export capabilities.",
      },
      {
        question: "How many lesson plans can I create?",
        answer:
          "Free plans allow up to 5 lesson plans. Basic plans offer unlimited lesson plans. Premium plans include unlimited plans plus advanced features like collaboration and analytics.",
      },
      {
        question: "Can I share my lesson plans with others?",
        answer:
          "Yes, sharing capabilities depend on your subscription tier. Premium users can collaborate in real-time, while Basic users can share view-only links. Free users can only view their own plans.",
      },
    ],
  },
  {
    icon: Zap,
    title: "Features & Capabilities",
    description: "Learn about platform features and tools",
    faqs: [
      {
        question: "What are AI suggestions?",
        answer:
          "AI suggestions provide intelligent recommendations for lesson content, activities, and assessments based on your teaching objectives. Basic plans include fundamental AI assistance, while Premium plans offer advanced AI features and customization.",
      },
      {
        question: "What templates are available?",
        answer:
          "We offer a variety of templates for different subjects, grade levels, and teaching styles. Free users have access to basic templates, while paid plans unlock our full template library and customization options.",
      },
      {
        question: "How does team management work?",
        answer:
          "Premium plan subscribers can create teams, assign roles, and collaborate on lesson plans. This includes features like shared workspaces, permission management, and activity tracking.",
      },
    ],
  },
  {
    icon: Mail,
    title: "Support & Help",
    description: "Get assistance and learn about support options",
    faqs: [
      {
        question: "How can I contact support?",
        answer:
          "Free users can access our community forums and knowledge base. Basic users receive email support with 24-hour response time. Premium users get priority support with 4-hour response time and access to video consultations.",
      },
      {
        question: "Do you offer training?",
        answer:
          "Yes, we provide various training resources. All users have access to basic tutorials. Premium users receive additional benefits like live webinars and one-on-one training sessions.",
      },
      {
        question: "Is there a community forum?",
        answer:
          "Yes, we have an active community forum where educators can share ideas, ask questions, and collaborate. All users can access the forum, with premium users getting additional networking features.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="bg-white border-b sticky top-0 z-10 py-4 px-8">
        <h1 className="text-2xl font-bold flex items-center">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground mt-2">
          Find answers to common questions about our platform, features, and
          subscription plans.
        </p>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {faqCategories.map((category, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {<category.icon className="h-5 w-5 text-primary" />}
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${index}-${faqIndex}`}
                    >
                      <AccordionTrigger className="text-sm font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
