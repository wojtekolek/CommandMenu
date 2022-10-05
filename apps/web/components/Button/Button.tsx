import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

import styled from 'styled-components'

import type { RequireOnlyOne } from 'utils/utilityTypes'

const StyledButton = styled.button`
  display: inline-block;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: transparent;
  border: none;
  padding: ${({ theme }) => theme.spacing.ss0};
  font-size: ${({ theme }) => theme.fontSize.fs2};
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s;
  outline: none;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.99);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

type ButtonPropsBase = PropsWithChildren<{
  className?: string
  testid?: string
  title?: string
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  onClick?: () => void
}>

type ButtonProps = RequireOnlyOne<ButtonPropsBase, 'children' | 'title'>

export const Button: FunctionComponent<ButtonProps> = ({
  disabled,
  onClick,
  testid,
  className,
  type = 'button',
  children,
  title
}) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!disabled && onClick) {
      event.preventDefault()
      return onClick()
    }
    return null
  }

  return (
    <StyledButton
      data-testid={testid}
      className={className}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      {children || title}
    </StyledButton>
  )
}
