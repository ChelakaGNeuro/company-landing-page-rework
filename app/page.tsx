import Hero from "@/components/home/hero";
import { Navbar } from "@/components/shared/navbar";
import { SmoothScroll } from "@/components/shared/smooth-scroll";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { Statistics } from "@/components/home/statistics";
import { Work } from "@/components/home/work";
import Services from "@/components/home/services";
import ContactUs from "@/components/contact-us/contact-us";
import { QuoteFAB } from "@/components/quote/quote-fab";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <Statistics />
        <Work />
        <Services />
        <ContactUs />
        <Footer />
      </main>
      <ScrollToTop />
      <QuoteFAB />
    </SmoothScroll>
  );
}
