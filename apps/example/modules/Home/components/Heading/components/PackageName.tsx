import { FunctionComponent, useState } from 'react'

import copyToClipboard from 'copy-to-clipboard'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

import { Button as ButtonBase } from 'components/Button'
import { Icon } from 'components/Icon'

const animationVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  }
}

const Button = styled(ButtonBase)`
  height: 50px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`

const ButtonTitleIcon = styled(Icon)`
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spacing.ss1};
`

const ButtonTitle = styled(motion.div).attrs({
  variants: animationVariants,
  initial: 'initial',
  animate: 'animate',
  exit: 'initial'
})`
  display: flex;
`

const PACKAGE_NAME = 'commandmenu'

export const PackageName: FunctionComponent = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyPackageNameToClipboard = () => {
    copyToClipboard(PACKAGE_NAME)
    setIsCopied(true)

    let timer: ReturnType<typeof setTimeout> | undefined = undefined

    timer = setTimeout(() => {
      clearTimeout(timer)
      setIsCopied(false)
    }, 2000)
  }

  return (
    <Button onClick={copyPackageNameToClipboard}>
      <AnimatePresence mode="wait">
        {isCopied ? (
          <ButtonTitle key="copied">Copied!</ButtonTitle>
        ) : (
          <ButtonTitle key="normal">
            <ButtonTitleIcon name="Copy" />
            {PACKAGE_NAME}
          </ButtonTitle>
        )}
      </AnimatePresence>
    </Button>
  )
}
