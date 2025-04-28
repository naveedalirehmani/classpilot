import { Construction } from "lucide-react"

export function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Construction className="h-16 w-16 text-yellow-500 animate-bounce mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Under Construction</h2>
      <p className="text-gray-600 max-w-md">
        We&apos;re working hard to bring you something amazing! This section will be available soon.
      </p>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
        <p className="text-sm text-yellow-700">
          Thank you for your patience while we build this feature.
        </p>
      </div>
    </div>
  )
} 