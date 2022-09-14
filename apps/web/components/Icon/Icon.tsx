import { FunctionComponent } from 'react'
import * as icons from '@styled-icons/feather'

export type IconNameTypes = keyof typeof icons

type IconProps = {
  name: IconNameTypes
  className?: string
  size?: number
  title?: string
}

export const Icon: FunctionComponent<IconProps> = ({
  name,
  size = 22,
  title = 'icon',
  className
}) => {
  const Component = icons[name]
  return <Component size={size} title={title} className={className} />
}
