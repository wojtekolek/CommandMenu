import type { FunctionComponent } from 'react'

import styled from 'styled-components'
import { Title } from 'components/Primitives'
import { from } from 'utils/styles/responsiveness'
import { CopyPackageName } from './components/CopyPackageName'

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.ss8};
  margin-bottom: ${({ theme }) => theme.spacing.ss4};
  gap: ${({ theme }) => theme.spacing.ss3};

  ${Title} {
    text-align: center;
  }
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
    <Title>
      Headless UI for building
      <br />
      command palettes in React.
    </Title>
    <CopyPackageName />
    <Separator />
  </HeadingWrapper>
)
