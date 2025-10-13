import TeamMemberComponent from "@/components/teamMember";
// import HeroPage from "@/components/hero";
import SponsorsComponent from "@/components/sponsor";
import StoryComponent from "@/components/Story";
import Image from "next/image";
import EventSection from "@/components/Events";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen overflow-x-hidden">
      {/* <HeroPage /> */}
      {/* hero compoenent */}
      <div id="home" className="h-[110vh] w-full">
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
      {/* <div id="story">
        <StoryComponent />
      </div> */}
      <div id="events">
        <EventSection />
      </div>
      <div id="team">
        <TeamMemberComponent />
      </div>
      <div id="sponsors">
        <SponsorsComponent />
      </div>
      <Footer />
    </main>
  );
}
