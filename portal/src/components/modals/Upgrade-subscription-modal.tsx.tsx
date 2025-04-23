"use client"

import { useState } from "react"
import { Check, Sparkles, Shield, Zap, X, CreditCard, Loader2, BookOpen } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useModalStore } from "src/store/modal.store"
import { ModalType } from "src/types/modal"

export function UpgradeSubscriptionModal() {
  const { activeModal, closeModal } = useModalStore()
  const isOpen = activeModal === ModalType.UPGRADE
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
  ]

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
  ]

  const handleUpgrade = async () => {
    if (!selectedPlan) return

    setIsSubmitting(true)

    try {
      // Simulate API call to upgrade subscription
      console.log("Upgrading to plan:", selectedPlan, "with billing cycle:", billingCycle)
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API delay

      // Close modal after successful upgrade
      closeModal()
    } catch (error) {
      console.error("Error upgrading subscription:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => closeModal()}>
      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Upgrade Your Subscription
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="text-center mb-6">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Unlock more features and capabilities with our premium plans.
            </p>

            <Tabs
              defaultValue="monthly"
              className="w-[300px] mx-auto"
              onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    Save 15%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`flex flex-col h-full relative overflow-hidden transition-all duration-200 cursor-pointer ${
                  selectedPlan === plan.id
                    ? "border-emerald-500 ring-2 ring-emerald-500 ring-opacity-50"
                    : plan.popular
                      ? "border-primary shadow-md"
                      : ""
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.badge && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-tl-none rounded-br-none rounded-tr-md rounded-bl-md bg-primary text-primary-foreground px-3 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    {plan.name === "Free" && <BookOpen className="mr-2 h-5 w-5 text-gray-500" />}
                    {plan.name === "Basic" && <Zap className="mr-2 h-5 w-5 text-blue-500" />}
                    {plan.name === "Premium" && <Sparkles className="mr-2 h-5 w-5 text-amber-500" />}
                    {plan.name}
                    {selectedPlan === plan.id && <Check className="ml-auto h-5 w-5 text-emerald-500" />}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pb-4">
                  <div className="mb-4">
                    <p className="text-2xl font-bold">
                      {plan.price[billingCycle] === 0 ? (
                        "Free"
                      ) : (
                        <>
                          ${plan.price[billingCycle].toFixed(2)}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            /{billingCycle === "monthly" ? "mo" : "yr"}
                          </span>
                        </>
                      )}
                    </p>
                    {plan.price[billingCycle] > 0 && billingCycle === "yearly" && (
                      <p className="text-xs text-green-600 mt-1">
                        Save ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(2)} per year
                      </p>
                    )}
                  </div>

                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-gray-300 mr-2 shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "" : "text-gray-400"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* <div className="mt-8">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Frequently Asked Questions
            </h3>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-sm font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-500">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div> */}

          {/* <Separator className="my-6" /> */}

          <div className="flex justify-end gap-3 mt-10">
            <Button type="button" variant="outline" onClick={() => closeModal()} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={!selectedPlan || isSubmitting || selectedPlan === "free"}
              onClick={handleUpgrade}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : selectedPlan === "free" ? (
                "Current Plan"
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Upgrade Now
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
