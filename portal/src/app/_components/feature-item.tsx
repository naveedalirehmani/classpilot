import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureItemProps {
  title: string
  description: string
  features: string[]
  imageSrc: string
  imageAlt: string
}

export default function FeatureItem({ title, description, features, imageSrc, imageAlt }: FeatureItemProps) {
  return (
    <div className="flex flex-col mb-28 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-1/2">
          <h3 className="text-3xl font-bold mb-4">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="md:w-1/2">
          <ul className="space-y-4">
            {features.map((item) => (
              <li key={item} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="rounded-xl overflow-hidden">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={imageAlt}
              width={2000}
              height={1000}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
