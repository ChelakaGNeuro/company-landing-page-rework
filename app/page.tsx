import Hero from "@/components/hero/hero";
import { Navbar } from "@/components/navbar/navbar";
import { Statistics } from "@/components/statistics/statistics";
import { Work } from "@/components/work/work";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Statistics />
      <Work/>
    </main>
  );
}
