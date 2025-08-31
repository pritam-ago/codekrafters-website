import TeamMemberComponent from "@/components/teamMember";
import HeroPage from "@/components/hero";
import SponsorsComponent from "@/components/sponsor";

export default function Home() {
  return (
    <>
      <HeroPage />
      <TeamMemberComponent />
      <SponsorsComponent />
    </>
  );
}
