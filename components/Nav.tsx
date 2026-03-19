import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft, ArrowRight } from "lucide-react";

type NavProps = {
  variant: "default" | "dashboard" | "form" | "public";
  userId?: string | null;
};

export default function Nav({ variant, userId }: NavProps) {
  return (
    <nav className="border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          briefed
        </Link>

        <div className="flex items-center gap-3">
          {variant === "default" && !userId && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Get started</Link>
              </Button>
            </>
          )}

          {variant === "default" && userId && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton />
            </>
          )}

          {variant === "dashboard" && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton />
            </>
          )}

          {variant === "form" && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard" className="gap-2">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
                </Link>
              </Button>
              <UserButton />
            </>
          )}

          {variant === "public" && (
            <Button size="sm" variant="outline" asChild>
              <Link href="/sign-up" className="gap-2">
                Create your own <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
