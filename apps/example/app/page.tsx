import type { FunctionComponent } from "react";

import { Home } from "modules/Home";
import { HowToUse } from "modules/HowToUse";

export const runtime = "edge";

const HomePage: FunctionComponent = () => (
  <div className="flex flex-col gap-4">
    <Home />
    <HowToUse />
  </div>
);
export default HomePage;
