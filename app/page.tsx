import { auth } from "@clerk/nextjs/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="bg-background text-foreground flex flex-col">
      <Nav variant="default" userId={userId} />
      <main className="flex-1">
        <Hero userId={userId} />
        {!userId && (
          <>
            <HowItWorks />
            <Features />
            <CTA />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
