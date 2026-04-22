import Hero from "@/components/hero/hero";
import { Navbar } from "@/components/navbar/navbar";
import { Statistics } from "@/components/statistics/statistics";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Statistics />
    </main>
  );
}
