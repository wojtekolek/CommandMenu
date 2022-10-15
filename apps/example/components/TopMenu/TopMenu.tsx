import type { FunctionComponent } from 'react'

import styled from 'styled-components'

import { Icon } from 'components/Icon'
import { Image } from 'components/Image'
import { ExternalLink } from 'components/Link'
import { Badges } from 'components/Primitives/Badges'
import Logo from 'public/logo.svg'

const TopMenuWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  margin: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss10}`};
`

const TopMenuTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.fs3};
  color: ${({ theme }) => theme.colors.text.primary};
`

const LogoIcon = styled(Image)`
  margin-right: ${({ theme }) => theme.spacing.ss1};
`

const GithubIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.spacing.ss1};
`

export const TopMenu: FunctionComponent = () => (
  <TopMenuWrapper>
    <TopMenuTitle>
      <LogoIcon alt="Logo" src={Logo} width={35} height={26} />
      Command Palette
    </TopMenuTitle>
    <Badges>
      <Badges.Badge>
        <ExternalLink href="https://github.com/wojtekolek/commandmenu">
          <GithubIcon name="Github" />
          github.com/wojtekolek/commandmenu
        </ExternalLink>
      </Badges.Badge>
    </Badges>
  </TopMenuWrapper>
)
