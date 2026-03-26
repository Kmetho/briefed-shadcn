import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

type NavProps = {
  variant: "default" | "dashboard" | "form" | "public";
  userId?: string | null;
};

export default function Nav({ variant, userId }: NavProps) {
  return (
    <nav className="border-b border-border/60 px-6 py-3.5 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight font-[family-name:var(--font-display)]"
        >
          briefed
        </Link>

        <ThemeToggle />

        <div className="flex items-center gap-2">
          {variant === "default" && !userId && (
            <>
              <Button variant="ghost" size="sm" asChild className="text-xs">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" asChild className="text-xs">
                <Link href="/sign-up">Get started</Link>
              </Button>
            </>
          )}

          {variant === "default" && userId && (
            <>
              <Button variant="ghost" size="sm" asChild className="text-xs">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton />
            </>
          )}

          {variant === "dashboard" && (
            <>
              <Button variant="ghost" size="sm" asChild className="text-xs">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton />
            </>
          )}

          {variant === "form" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-xs gap-1.5"
              >
                <Link href="/dashboard">
                  <ArrowLeft className="h-3 w-3" /> Back
                </Link>
              </Button>
              <UserButton />
            </>
          )}

          {variant === "public" && (
            <Button
              size="sm"
              variant="outline"
              asChild
              className="text-xs gap-1.5"
            >
              <Link href="/sign-up">
                Create your own <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
