import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Link
        href="/"
        className="text-2xl font-semibold text-foreground tracking-tight mb-8"
      >
        briefed
      </Link>

      <SignIn
        appearance={{
          variables: {
            colorBackground: "oklch(1 0 0)",
            colorInputBackground: "oklch(0.97 0 0)",
            colorText: "oklch(0.145 0 0)",
            colorTextSecondary: "oklch(0.556 0 0)",
            colorInputText: "oklch(0.145 0 0)",
            colorPrimary: "oklch(0.56 0.25 302)",
            colorDanger: "oklch(0.58 0.22 27)",
            borderRadius: "0.875rem",
            fontFamily: "inherit",
            fontSize: "0.875rem",
          },
          elements: {
            card: "shadow-none border border-border",
            headerTitle: "font-semibold text-lg",
            headerSubtitle: "text-muted-foreground text-sm",
            formButtonPrimary: "font-medium",
            footerActionLink: "text-primary hover:text-primary/80",
          },
        }}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
