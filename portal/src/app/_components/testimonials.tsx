import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Testimonials() {
    const testimonials = [
      {
        quote: "ClassPlanner has revolutionized how I prepare for my classes. What used to take hours now takes minutes.",
        author: "Sarah Johnson",
        role: "5th Grade Teacher",
      },
      {
        quote:
          "The AI-generated worksheets are incredibly well-designed and my students love them. It's like having a teaching assistant!",
        author: "Michael Chen",
        role: "High School Science Teacher",
      },
      {
        quote:
          "The Kanban board helps me stay organized throughout the semester. I can finally see my entire teaching plan at a glance.",
        author: "Emily Rodriguez",
        role: "Middle School English Teacher",
      },
    ]
  
    return (
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">What Teachers Are Saying</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Card key={index} className="p-6">
              <CardContent className="pt-4">
                <p className="text-gray-600 italic">&ldquo;{item.quote}&rdquo;</p>
              </CardContent>
              <CardFooter className="pt-6">
                <div className="flex items-center">
                  <Avatar className="mr-4">
                    <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">{item.author}</div>
                    <div className="text-gray-600 text-sm">{item.role}</div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    )
  }
  