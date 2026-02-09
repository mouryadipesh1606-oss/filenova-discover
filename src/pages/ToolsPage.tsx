import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolsGrid } from "@/components/ToolsGrid";

const ToolsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-8">
      <ToolsGrid showAll />
    </main>
    <Footer />
  </div>
);

export default ToolsPage;
