import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Feature {
  image: string
  title: string
  description: string
}

interface FeatureItemProps {
  title: string
  description: string
  features: Feature[]
  imageSrc: string
  imageAlt: string
}

export default function FeatureItem({ title, description, features, imageSrc, imageAlt }: FeatureItemProps) {
  return (
    <div className="flex flex-col mb-16 sm:mb-28 mx-auto max-w-6xl font-nunito px-4 sm:px-6">
      <div className="flex flex-col md:flex-row gap-8 mb-6 sm:mb-10">
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 w-full sm:w-[450px] leading-tight">{title}</h3>
          <p className="text-gray-600 py-2 sm:py-4 w-full sm:w-[500px]">{description}</p>
        </div>
        <div className="w-full md:w-1/2">
          <ul className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-20 space-y-6 space-x-0">
            {features.map((item, index) => (
              <li key={index} className="flex flex-col items-center text-center sm:items-start sm:text-left sm:block">
                <Image
                  src={`/${item.image}`}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="flex-shrink-0 rounded-md object-cover my-2 sm:my-4 mx-auto sm:mx-0"
                />
                <div>
                  <p className="font-semibold font-inter pt-1 sm:pt-2">{item.title}</p>
                  <p className="text-sm text-muted-foreground pt-2 sm:pt-4">{item.description}</p>
                </div>
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
              className="w-full h-auto object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
