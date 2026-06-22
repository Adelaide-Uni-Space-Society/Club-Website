import Contact from "@/components/home/Contact";
import Events from "@/components/home/Events";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Newsletter from "@/components/home/Newsletter";
import Purpose from "@/components/home/Purpose";
import Sponsors from "@/components/home/Sponsors";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <Events />
      <Purpose />
      <Sponsors />
      <Marquee />
      <Newsletter />
      <Contact />
    </div>
  );
}
