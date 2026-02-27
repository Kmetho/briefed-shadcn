import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4">
      <Link
        href="/"
        className="text-2xl font-semibold text-zinc-50 tracking-tight mb-8"
      >
        briefed
      </Link>

      <SignIn
        appearance={{
          variables: {
            colorBackground: "#18181b", // zinc-900
            colorInputBackground: "#09090b", // zinc-950
            colorText: "#fafafa", // zinc-50
            colorTextSecondary: "#a1a1aa", // zinc-400
            colorInputText: "#fafafa",
            colorPrimary: "#fafafa",
            colorDanger: "#f87171",
            borderRadius: "0.5rem",
            fontFamily: "inherit",
            fontSize: "0.875rem",
          },
          elements: {
            card: "shadow-none border border-zinc-800 bg-zinc-900",
            headerTitle: "text-zinc-50 font-semibold text-lg",
            headerSubtitle: "text-zinc-400 text-sm",
            socialButtonsBlockButton:
              "border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 transition-colors",
            socialButtonsBlockButtonText: "text-zinc-100 font-medium text-sm",
            dividerLine: "bg-zinc-700",
            dividerText: "text-zinc-500 text-xs",
            formFieldLabel: "text-zinc-300 text-sm font-medium",
            formFieldInput:
              "bg-zinc-950 border border-zinc-700 text-zinc-50 placeholder:text-zinc-600 focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 rounded-md",
            formButtonPrimary:
              "bg-zinc-50 text-zinc-950 hover:bg-zinc-200 font-medium rounded-md transition-colors",
            footerActionLink: "text-zinc-300 hover:text-zinc-50",
            footerActionText: "text-zinc-500",
            identityPreviewText: "text-zinc-300",
            identityPreviewEditButtonIcon: "text-zinc-400",
          },
        }}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
