import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Link
        href="/"
        className="text-2xl font-semibold text-foreground tracking-tight mb-8 font-[family-name:var(--font-display)]"
      >
        briefed
      </Link>
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
