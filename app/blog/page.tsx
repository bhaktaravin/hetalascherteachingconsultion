import Blog from "../components/Blog";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";

export const dynamic = "force-dynamic";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Blog />
      <SiteFooter />
    </main>
  );
}
