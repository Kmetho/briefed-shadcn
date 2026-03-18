import { auth } from "@clerk/nextjs/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav userId={userId} />
      <main className="flex-1">
        <Hero userId={userId} />
        {!userId && (
          <>
            <HowItWorks />
            <Separator />
            <Features />
            <Separator />
            <CTA />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
