import type { FunctionComponent } from "react";

import NextImage, { type ImageProps as NextImageProps } from "next/image";

export type ImageProps = NextImageProps & {
  alt: string;
};

export const Image: FunctionComponent<ImageProps> = (props) => <NextImage {...props} />;
