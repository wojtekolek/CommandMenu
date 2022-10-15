import { FunctionComponent, useState } from 'react'
import copyToClipboard from 'copy-to-clipboard'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
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

const ANIMATION_PROPS = {
  variants: animationVariants,
  initial: 'initial',
  animate: 'animate',
  exit: 'initial'
}

const Button = styled(ButtonBase)`
  height: 50px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`

const ButtonTitleIcon = styled(Icon)`
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spacing.ss1};
`

const ButtonTitle = styled(motion.span).attrs(ANIMATION_PROPS)`
  display: flex;
`

const PACKAGE_NAME = '@wojtekolek/cmdpalette'

export const CopyPackageName: FunctionComponent = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyPackageNameToClipboard = () => {
    copyToClipboard(PACKAGE_NAME)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <Button onClick={copyPackageNameToClipboard}>
      <AnimatePresence mode="wait" initial={false}>
        {isCopied ? (
          <ButtonTitle>Copied</ButtonTitle>
        ) : (
          <ButtonTitle>
            <ButtonTitleIcon name="Copy" />
            {PACKAGE_NAME}
          </ButtonTitle>
        )}
      </AnimatePresence>
    </Button>
  )
}
