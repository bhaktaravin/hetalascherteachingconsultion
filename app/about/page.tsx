import About from "../components/About";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <About />
      <SiteFooter />
    </main>
  );
}
