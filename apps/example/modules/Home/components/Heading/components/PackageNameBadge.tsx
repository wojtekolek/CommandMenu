import { FunctionComponent, useState } from 'react'
import copyToClipboard from 'copy-to-clipboard'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { Badges } from 'components/Primitives/Badges'
import { Icon } from 'components/Icon'
import { Button as ButtonBase } from 'components/Button'

const animationVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  }
}

const animationProps = {
  variants: animationVariants,
  initial: 'initial',
  animate: 'animate',
  exit: 'initial'
}

const Button = styled(ButtonBase)`
  height: 50px;
  width: 218px;
`

const ButtonTitleIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.spacing.ss1};
`

const PACKAGE_NAME = '@wojtekolek/cmdpalette'

export const PackageNameBadge: FunctionComponent = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyPackageNameToClipboard = () => {
    copyToClipboard(PACKAGE_NAME)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <Badges.Badge>
      <Button onClick={copyPackageNameToClipboard}>
        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.span {...animationProps}>Copied</motion.span>
          ) : (
            <motion.span {...animationProps}>
              <ButtonTitleIcon name="Copy" />
              {PACKAGE_NAME}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </Badges.Badge>
  )
}
