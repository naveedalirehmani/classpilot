import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function CTACard() {
  return (
    <div className="container mx-auto px-4 py-12  font-nunito ">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Ready to transform your lesson planning?</h2>

      <Card className="max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <p className="text-lg text-muted-foreground text-center mb-6">
            Join thousands of teachers who are saving time and creating better learning experiences with ClassPlanner.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href="/signup">
                Get started for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">No credit card required. Free 14-day trial.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

