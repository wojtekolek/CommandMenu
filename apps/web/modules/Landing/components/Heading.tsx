import type { FunctionComponent } from 'react'

import styled from 'styled-components'

import { Icon } from 'components/Icon'
import { Image } from 'components/Image'
import { SubTitle, Title } from 'components/Primitives'
import { Badges } from 'components/Primitives/Badges'

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.ss8};
  margin-bottom: ${({ theme }) => theme.spacing.ss4};
  gap: ${({ theme }) => theme.spacing.ss3};
`

const TitleWrapper = styled.div`
  display: flex;
`

const Separator = styled.div`
  width: 80%;
  height: 2px;
  background: ${({ theme }) => theme.colors.misc.separatorGradient};
`

export const Heading: FunctionComponent = () => (
  <HeadingWrapper>
    <TitleWrapper>
      <Image alt="logo" src="/logo.svg" width={115} height={105} />
      <Title>mdMenu</Title>
    </TitleWrapper>
    <SubTitle>Headless UI for building command menus in React.</SubTitle>
    <Badges>
      <Badges.Badge>
        <Icon name="Github" />-
      </Badges.Badge>
      <Badges.Badge>
        <Icon name="Copy" />-
      </Badges.Badge>
    </Badges>
    <Separator />
  </HeadingWrapper>
)
