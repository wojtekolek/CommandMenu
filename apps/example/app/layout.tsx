import type { FunctionComponent, ReactNode } from "react";

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

export const metadata: Metadata = {
  title: "Command Menu — Headless UI for building command menus in React.",
  description: "Headless UI for building command menus in React.",
  icons: {
    icon: "./favicon.ico",
  },
  authors: [
    {
      name: "Wojtek Olek",
      url: "https://wojtekolek.com",
    },
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: colors.primary[50] },
    { media: "(prefers-color-scheme: dark)", color: colors.primary[950] },
  ],
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
    </body>
  </html>
);

export default RootLayout;
