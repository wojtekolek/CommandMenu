import type { FunctionComponent } from 'react'

import styled from 'styled-components'
import { Icon } from 'components/Icon'
import { Image } from 'components/Image'
import { SubTitle as SubTitleBase, Title } from 'components/Primitives'
import { Badges } from 'components/Primitives/Badges'
import { ExternalLink } from 'components/Link'
import Logo from 'public/logo.svg'
import { from } from 'utils/styles/responsiveness'
import { PackageNameBadge } from './components/PackageNameBadge'

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

const LogoImage = styled(Image)`
  width: 75px;
  height: auto;

  ${from('tablet')} {
    width: 115px;
  }
`

const SubTitle = styled(SubTitleBase)`
  text-align: center;
`

const Separator = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.misc.separatorGradient};

  ${from('tablet')} {
    width: 80%;
  }
`

export const Heading: FunctionComponent = () => (
  <HeadingWrapper>
    <TitleWrapper>
      <LogoImage priority alt="logo" src={Logo} />
      <Title>mdMenu</Title>
    </TitleWrapper>
    <SubTitle>Headless UI for building command menus in React.</SubTitle>
    <Badges>
      <Badges.Badge>
        <Icon name="Github" />
        <ExternalLink href="https://github.com/wojtekolek/cmdmenu">
          github.com/wojtekolek/cmdmenu
        </ExternalLink>
      </Badges.Badge>
      <PackageNameBadge />
    </Badges>
    <Separator />
  </HeadingWrapper>
)
