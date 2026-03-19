import BriefForm from "@/components/BriefForm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NewBrief() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav variant="form" />
      <main className="flex-1 bg-white py-20 px-4">
        <BriefForm mode="create" />
      </main>
      <Footer />
    </div>
  );
}
