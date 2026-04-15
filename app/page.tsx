import Hero from "@/components/hero/hero";
import { Navbar } from "@/components/navbar/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <Hero />
    </main>
  );
}
