import type { FunctionComponent } from "react";

import { Github } from "lucide-react";

import { Image } from "components/Image";
import { ExternalLink } from "components/Link";
import { Badges } from "components/Primitives";
import Logo from "public/logo.svg";

export const TopMenu: FunctionComponent = () => (
  <div className="desktop:my-10 mx-8 my-8 flex items-center justify-between">
    <div className="flex items-center text-lg">
      <Image className="mr-2" alt="Logo" src={Logo} width={35} height={26} />
      Command Menu
    </div>
    <Badges className="tablet:flex hidden">
      <Badges.Badge>
        <ExternalLink href="https://github.com/wojtekolek/commandmenu">
          <Github className="mr-2" />
          github.com/wojtekolek/commandmenu
        </ExternalLink>
      </Badges.Badge>
    </Badges>
  </div>
);
