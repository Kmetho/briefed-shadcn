import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const syne = Syne({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Briefed",
  description: "Creative briefs for designers, by designers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#ff7f11",
          colorDanger: "#ef4444",
          borderRadius: "0.625rem",
          fontFamily: "var(--font-sans)",
        },
        elements: {
          card: "shadow-none border border-border",
          headerTitle: "font-semibold text-lg",
          headerSubtitle: "text-muted-foreground text-sm",
          formButtonPrimary: "font-medium",
          footerActionLink: "text-primary hover:text-primary/80",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${dmSans.variable} ${syne.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
