import SponsorsComponent from "@/components/sponsor";
import StoryComponent from "@/components/Story";
import Image from "next/image";
import EventSection from "@/components/Events";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import TeamSection from "@/components/team-section";

export default function Home() {

  return (
    <main className="min-h-screen bg-background" style={{ scrollSnapType: "y mandatory" }}>
      <Navbar />
      <div id="home" className="h-[110vh] w-full" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <Image
          src="/ck-core.jpg"
          alt="CK Group"
          className="object-cover w-full h-full sm:block hidden"
          fill
        />
        <Image
          src="/ck-mob.png"
          alt="CK Group Mobile"
          className="object-cover w-full h-full block sm:hidden"
          fill
        />
      </div>
       <div id="story" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <StoryComponent />
      </div>
      <div id="events" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <EventSection />
      </div>
      <div id="team" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <TeamSection />
      </div>
      <div id="sponsors" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <SponsorsComponent />
      </div>
      <div id="contact" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <Footer />
      </div>
    </main>
  );
}
