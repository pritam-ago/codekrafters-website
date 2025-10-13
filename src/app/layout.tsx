import type { Metadata } from "next";
import "./globals.css";
import StaggeredMenu from "@/components/StaggeredMenu";

export const metadata: Metadata = {
  title: "CodeKrafters - Building Tomorrow's Tech Leaders",
  description:
    "CodeKrafters is a vibrant tech community fostering innovation, learning, and collaboration.",
};

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/#home" },
  { label: "Story", ariaLabel: "Learn our story", link: "/story" },
  { label: "Events", ariaLabel: "View our events", link: "/#events" },
  { label: "Team", ariaLabel: "Meet our team", link: "/#team" },
  { label: "Sponsors", ariaLabel: "Our sponsors", link: "/#sponsors" },
];

const socialItems = [
  { label: "Instagram", link: "https://instagram.com/codekrafters" },
  { label: "LinkedIn", link: "https://linkedin.com/company/codekrafters" },
  { label: "GitHub", link: "https://github.com/codekrafters" },
  { label: "Twitter", link: "https://twitter.com/codekrafters" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StaggeredMenu
          isFixed={true}
          items={menuItems}
          socialItems={socialItems}
          logoUrl="/ck_logo_extracted.svg"
          displaySocials={true}
          displayItemNumbering={true}
        />
        {children}
      </body>
    </html>
  );
}
