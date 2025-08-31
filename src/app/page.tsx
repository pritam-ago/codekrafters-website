import TeamMemberComponent from "@/components/teamMember";
import HeroPage from "@/components/hero";
import SponsorsComponent from "@/components/sponsor";
import StoryComponent from "@/components/Story";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen overflow-x-hidden">
      {/* <HeroPage /> */}
      {/* hero compoenent */}
      <div className="h-screen">
        <img
          src="/CK_group.png"
          alt="CK Group"
          className="object-cover w-full h-full"
        />
      </div>
      <StoryComponent/>
      <TeamMemberComponent />
      <SponsorsComponent />
    </main>
  );
}
