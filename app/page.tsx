import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Collections } from "@/components/collections";
import { Products } from "@/components/products";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Collections />
        <Products />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
