import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ContactForm />
    </main>
  );
}