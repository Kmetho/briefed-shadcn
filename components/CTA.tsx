import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center">
      <h2 className="text-4xl font-bold tracking-tight mb-4">
        Ready to get organised?
      </h2>
      <p className="text-muted-foreground mb-8">
        Join freelancers who stopped chasing clients for project details.
      </p>
      <Button size="lg" asChild className="gap-2">
        <Link href="/sign-up">
          Create your account <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </section>
  );
}
