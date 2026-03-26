import BriefForm from "@/components/BriefForm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NewBrief() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav variant="form" />
      <main className="flex-1 py-10 sm:py-16 px-4">
        <div className="max-w-lg mx-auto mb-8 px-4">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
            New brief
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-[family-name:var(--font-display)]">
            Create a brief
          </h1>
        </div>
        <BriefForm mode="create" />
      </main>
      <Footer />
    </div>
  );
}
