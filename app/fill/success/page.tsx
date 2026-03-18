import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function FillSuccess() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Brief submitted!
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Your designer will review it shortly. Thanks for taking the time!
        </p>
        <Button variant="outline" asChild>
          <Link href="/">Learn more about briefed</Link>
        </Button>
      </div>
    </div>
  );
}
