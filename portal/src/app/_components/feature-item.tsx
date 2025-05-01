import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  image: string;
  title: string;
  description: string;
}

interface FeatureItemProps {
  title: string;
  description: string;
  features: Feature[];
  imageSrc: string;
  imageAlt: string;
}

export default function FeatureItem({
  title,
  description,
  features,
  imageSrc,
  imageAlt,
}: FeatureItemProps) {
  return (
    <div className="flex flex-col mb-28  mx-auto max-w-6xl  font-nunito">
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-1/2">
          <h3 className="text-5xl font-bold mb-4 w-[450px] ">{title}</h3>
          <p className="text-gray-600  py-4 w-[500px]">{description}</p>
        </div>
        <div className="md:w-1/2 ">
          <ul className="space-y-6  space-x-20 flex ">
            {features.map((item, index) => (
              <li key={index} className=" gap-4 ">
                <Image
                  src={`/${item.image}`}
                  alt={item.title}
                  width={100}
                  height={100}
                  className=" flex-shrink-0 rounded-md object-cover my-4  "
                />
                <div>
                  <p className="font-semibold font-inter">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
  );
}
