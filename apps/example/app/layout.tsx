import type { FunctionComponent, ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { Footer } from "components/Footer";
import { TopMenu } from "components/TopMenu";
import { colors } from "utils/styles/colors.cjs";
import "utils/styles/globals.css";

const font = Montserrat({
  display: "swap",
  subsets: ["latin"],
  style: ["normal"],
  weight: ["200", "400", "500"],
  variable: "--font-montserrat",
});

const Title = "Command Menu — Headless UI for building command menus in React.";
const Description = "Headless UI for building command menus in React.";
const URL = "https://commandmenu.wojtekolek.com";

export const metadata: Metadata = {
  title: Title,
  description: Description,
  keywords: ["Next.js", "React", "JavaScript", "Typescript", "CommandMenu"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${URL}/site.webmanifest`,
  authors: [
    {
      name: "Wojtek Olek",
      url: "https://wojtekolek.com",
    },
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: colors.primary[950] },
    { media: "(prefers-color-scheme: dark)", color: colors.primary[950] },
  ],
  openGraph: {
    title: Title,
    description: Description,
    url: URL,
    siteName: "Command Menu",
    images: [
      {
        url: `${URL}/og.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => (
  <html
    lang="en"
    className={`${font.variable} bg-primary-950 font-montserrat text-primary-50 selection:text-primary-100 selection:bg-secondary-900 font-normal antialiased`}
  >
    <body>
      <TopMenu />
      <main className="tablet:mx-8 mx-4 my-6 p-0">{children}</main>
      <Footer />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
