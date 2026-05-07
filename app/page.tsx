import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TestimonialStrip from "./components/TestimonialStrip";
import Services from "./components/Services";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TestimonialStrip />
      <Services />
      <SiteFooter />
    </main>
  );
}
