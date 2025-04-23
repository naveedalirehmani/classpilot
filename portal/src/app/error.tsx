"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Something went wrong!</h2>
          {/* <p className="text-muted-foreground">
            {error.message || "An unexpected error occurred"}
          </p> */}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>
          <Link href={ROUTES.DASHBOARD}>
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
