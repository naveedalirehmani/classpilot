import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function CTACard() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-46">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Ready to transform your lesson planning?
      </h2>

      <div className="max-w-3xl mx-auto">
        <CardContent className="pt-4">
          <p className="text-lg text-muted-foreground text-center mb-6">
            Join thousands of teachers who are saving time and creating better
            learning experiences with Class Pilot.
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
        <CardFooter className="flex justify-center pt-6">
          <p className="text-sm text-muted-foreground">
            No credit card required. Free 14-day trial.
          </p>
        </CardFooter>
      </div>
    </div>
  );
}
