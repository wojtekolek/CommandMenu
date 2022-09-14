import { FunctionComponent } from 'react'

import NextImage, { ImageProps as NextImageProps } from 'next/future/image'

type ImageProps = NextImageProps & {
  alt: string
}

export const Image: FunctionComponent<ImageProps> = (props) => <NextImage {...props} />
