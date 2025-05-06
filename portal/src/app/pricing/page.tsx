"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Check, Shield, Sparkles, Zap, X, BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import Footer from "../_components/footer";
import Navbar from "@/components/Navbar";

export default function PricingPage() {
  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Basic features for educators just getting started",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        { name: "Up to 5 lesson plans", included: true },
        { name: "Basic templates", included: true },
        { name: "Community support", included: false },
        { name: "Export to PDF", included: false },
        { name: "Collaboration tools", included: false },
        { name: "AI suggestions", included: false },
        { name: "Priority support", included: false },
      ],
      popular: false,
      badge: null,
    },
    {
      id: "basic",
      name: "Basic",
      description: "Everything you need for regular lesson planning",
      price: {
        monthly: 9.99,
        yearly: 99.99,
      },
      features: [
        { name: "Unlimited lesson plans", included: true },
        { name: "All templates", included: true },
        { name: "Export to multiple formats", included: true },
        { name: "Email support", included: true },
        { name: "Collaboration tools", included: true },
        { name: "Basic AI suggestions", included: true },
        { name: "Priority support", included: false },
      ],
      popular: true,
      badge: "Most Popular",
    },
    {
      id: "premium",
      name: "Premium",
      description: "Advanced features for professional educators",
      price: {
        monthly: 19.99,
        yearly: 199.99,
      },
      features: [
        { name: "Everything in Basic", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom branding", included: true },
        { name: "Advanced AI suggestions", included: true },
        { name: "Priority support", included: true },
        { name: "Team management", included: true },
        { name: "API access", included: true },
      ],
      popular: false,
      badge: "Best Value",
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be applied immediately.",
    },
    {
      question: "How does the billing cycle work?",
      answer:
        "You'll be billed either monthly or yearly, depending on your preference. Yearly subscriptions offer a 15% discount compared to paying monthly.",
    },
    {
      question: "What happens to my lesson plans if I downgrade?",
      answer:
        "Your existing lesson plans will remain accessible. However, you may lose access to certain premium features and be limited to the number of lesson plans allowed by your new plan.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with your subscription, contact our support team within 14 days of purchase for a full refund.",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <Navbar />
      <div className="container mx-auto py-16 px-4 max-w-5xl">
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <Tabs defaultValue="monthly" className="mx-auto max-w-5xl mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  Save 15%
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-xl border bg-white p-6 shadow-sm h-full ${
                    plan.popular
                      ? "border-primary ring-1 ring-primary"
                      : "border-border"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      {plan.badge}
                    </div>
                  )}
                  <div className="pb-4">
                    <h3 className="text-lg font-bold flex items-center">
                      {plan.name === "Free" && <BookOpen className="mr-2 h-5 w-5 text-gray-500" />}
                      {plan.name === "Basic" && <Zap className="mr-2 h-5 w-5 text-blue-500" />}
                      {plan.name === "Premium" && <Sparkles className="mr-2 h-5 w-5 text-amber-500" />}
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-2xl font-bold">
                      {plan.price.monthly === 0 ? (
                        "Free"
                      ) : (
                        <>
                          ${plan.price.monthly.toFixed(2)}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            /mo
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  <ul className="mb-8 space-y-2 text-sm flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-gray-300 mr-2 shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "" : "text-gray-400"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      asChild
                      className="w-full"
                      variant={plan.id === "free" ? "outline" : "default"}
                    >
                      <Link href={plan.id === "free" ? ROUTES.SIGNUP : ROUTES.SIGNUP}>
                        {plan.id === "free" ? "Sign up" : "Start free trial"}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-xl border bg-white p-6 shadow-sm h-full ${
                    plan.popular
                      ? "border-primary ring-1 ring-primary"
                      : "border-border"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      {plan.badge}
                    </div>
                  )}
                  <div className="pb-4">
                    <h3 className="text-lg font-bold flex items-center">
                      {plan.name === "Free" && <BookOpen className="mr-2 h-5 w-5 text-gray-500" />}
                      {plan.name === "Basic" && <Zap className="mr-2 h-5 w-5 text-blue-500" />}
                      {plan.name === "Premium" && <Sparkles className="mr-2 h-5 w-5 text-amber-500" />}
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-2xl font-bold">
                      {plan.price.yearly === 0 ? (
                        "Free"
                      ) : (
                        <>
                          ${(plan.price.yearly / 12).toFixed(2)}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            /mo
                          </span>
                        </>
                      )}
                    </p>
                    {plan.price.yearly > 0 && (
                      <p className="text-xs text-green-600 mt-1">
                        Save ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(2)} per year
                      </p>
                    )}
                  </div>

                  <ul className="mb-8 space-y-2 text-sm flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-gray-300 mr-2 shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "" : "text-gray-400"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      asChild
                      className="w-full"
                      variant={plan.id === "free" ? "outline" : "default"}
                    >
                      <Link href={plan.id === "free" ? ROUTES.SIGNUP : ROUTES.SIGNUP}>
                        {plan.id === "free" ? "Sign up" : "Start free trial"}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mx-auto max-w-3xl mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-sm font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <p className="mb-4 text-muted-foreground">
              Have more questions? We&apos;re here to help.
            </p>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 