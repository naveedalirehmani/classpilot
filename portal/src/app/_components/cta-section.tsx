import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to transform your lesson planning?</h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Join thousands of teachers who are saving time and creating better learning experiences with ClassPlanner.
        </p>
        <Button asChild size="lg">
          <Link href="/signup">
            Get started for free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <p className="text-muted-foreground mt-4">No credit card required. Free 14-day trial.</p>
      </div>
    </section>
  )
}
