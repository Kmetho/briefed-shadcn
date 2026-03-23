import BriefForm from "@/components/BriefForm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NewBrief() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav variant="form" />
      <main className="flex-1 py-10 sm:py-16 px-4">
        <BriefForm mode="create" />
      </main>
      <Footer />
    </div>
  );
}
