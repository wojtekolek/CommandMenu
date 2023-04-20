import type { FunctionComponent } from "react";

import type { Metadata } from "next";

import { Home } from "modules/Home";
import { HowToUse } from "modules/HowToUse";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage: FunctionComponent = () => (
  <div className="flex flex-col gap-4">
    <Home />
    <HowToUse />
  </div>
);
export default HomePage;
