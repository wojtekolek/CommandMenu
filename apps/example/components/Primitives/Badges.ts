import styled from 'styled-components'
import { from } from 'utils/styles/responsiveness'

const BadgesBase = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  gap: ${({ theme }) => theme.spacing.ss2};

  ${from('tablet')} {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.ss4};
  }
`

const Badge = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.ss1};
  line-height: 50px;
  padding: ${({ theme }) => `${theme.spacing.ss0} ${theme.spacing.ss2}`};
  border-radius: ${({ theme }) => theme.radius.rad3};
  border: 1px solid ${({ theme }) => theme.colors.misc.border};
  background-color: ${({ theme }) => theme.colors.background.secondary};

  svg {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const Badges = Object.assign(BadgesBase, {
  Badge
})
