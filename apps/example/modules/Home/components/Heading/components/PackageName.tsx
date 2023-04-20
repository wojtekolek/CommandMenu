import { type FunctionComponent, useState } from "react";

import copyToClipboard from "copy-to-clipboard";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import { Copy } from "lucide-react";

import { Button } from "components/Button";

const BUTTON_ANIMATION_PROPS: AnimationProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },
  initial: "initial",
  animate: "animate",
  exit: "initial",
};

const PACKAGE_NAME = "commandmenu";

export const PackageName: FunctionComponent = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyPackageNameToClipboard = () => {
    copyToClipboard(PACKAGE_NAME);
    setIsCopied(true);

    let timer: ReturnType<typeof setTimeout> | undefined = undefined;

    timer = setTimeout(() => {
      clearTimeout(timer);
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Button className="leading-10" onClick={copyPackageNameToClipboard}>
      <AnimatePresence mode="wait">
        {isCopied ? (
          <motion.div {...BUTTON_ANIMATION_PROPS} key="copied">
            Copied!
          </motion.div>
        ) : (
          <motion.div {...BUTTON_ANIMATION_PROPS} className="flex items-center" key="normal">
            <Copy className="mr-2" />
            {PACKAGE_NAME}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};
