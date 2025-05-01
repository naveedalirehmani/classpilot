"use client"

import { useEffect, useState } from "react"
import { ClipboardList, FileText, FolderArchive } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ReplacesSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set visible after component mounts for animation
    setIsVisible(true)
  }, [])

  const items = [
    {
      title: "Manual lesson planning",
      icon: ClipboardList,
      description: "Save hours of time with automated planning tools",
    },
    {
      title: "Disorganized worksheets",
      icon: FileText,
      description: "Keep all your materials structured and easily accessible",
    },
    {
      title: "Scattered curriculum docs",
      icon: FolderArchive,
      description: "Centralize your curriculum in one organized location",
    },
  ]

  return (
    <section className="container mx-auto max-w-6xl px-4 py-24">
      <div className="text-center mb-12">
        <h2 className="font-bold font-nunito text-3xl mb-4">Replaces</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our platform eliminates these common teaching pain points, saving you time and reducing stress.
        </p>
      </div>

      <div
        className={`transform transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <Card className="border-2 hovetransition-all duration-300 ">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center px-4">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">{item.description}</p>

                  {/* Add separator for mobile view only */}
                  {index < items.length - 1 && <Separator className="mt-6 md:hidden w-1/2 mx-auto" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
