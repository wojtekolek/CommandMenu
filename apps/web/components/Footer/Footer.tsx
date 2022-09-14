import { FunctionComponent } from 'react'

import styled from 'styled-components'

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: ${({ theme }) => theme.colors.misc.footerGradient};
`

const FooterText = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const CopyrightYear = styled.span`
  margin-left: ${({ theme }) => theme.spacing.ss2};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

const AuthorWebsiteLink = styled.a.attrs({
  href: 'https://wojtekolek.com',
  target: '_blank'
})`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: underline dashed 1px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`

const YEAR = new Date().getFullYear()

export const Footer: FunctionComponent = () => (
  <FooterWrapper>
    <FooterText>
      Made with 🖤 by <AuthorWebsiteLink>Wojtek Olek</AuthorWebsiteLink>
      <CopyrightYear>{YEAR} ©</CopyrightYear>
    </FooterText>
  </FooterWrapper>
)

const reverse = (string: string): string => string.split('').reverse().join('')

const isPalindrome = (string: string): boolean => {
  const validCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const stringCharacters = string
    .toLowerCase()
    .split('')
    .filter((letter) => validCharacters.includes(letter))
    .join('')
  return stringCharacters === reverse(stringCharacters)
}

const reverseInteger = (number: number): number =>
  parseInt(number.toString().split('').reverse().join('')) * Math.sign(number)

const fizzBuzz = (number: number): Array<unknown> => {
  const array = new Array(number).fill(0).map((_, index) => index + 1)
  return array.map((num) => {
    if (num % 2 === 0 && num % 3 === 0) {
      return 'Fizz Buzz'
    }
    if (num % 2 === 0) {
      return 'Fizz'
    }
    if (num % 3 === 0) {
      return 'Buzz'
    }
    return num
  })
}

const maxCharacter = (string: string): string | undefined => {
  const characters: Record<string, number> = string
    .replace(/ /g, '')
    .split('')
    .reduce<Record<string, number>>((sum, current) => {
      const key = `${current}`
      sum[key] = sum[key] + 1 || 1
      return sum
    }, {})
  console.log(characters)

  let maxNumber = 0
  let maxCharacter = undefined
  for (let character in characters) {
    if (characters[character] > maxNumber) {
      maxNumber = characters[character]
      maxCharacter = character
    }
  }
  return maxCharacter
}

const chunk = (array: Array<number>, size: number): Array<Array<number>> => {
  let index = 0
  const arrays = array.reduce<Array<Array<number>>>((sum, current) => {
    const indexToPush = sum[index]?.length + 1 > size ? index + 1 : index
    index = indexToPush
    if (!Array.isArray(sum[indexToPush])) {
      sum[indexToPush] = []
    }
    sum[indexToPush].push(current)
    return sum
  }, [])
  return arrays
}

const _chunk = (array: Array<number>, size: number): Array<Array<number>> => {
  const chunks: Array<Array<number>> = []
  array.forEach((item) => {
    const lastChunk = chunks[chunks.length - 1]
    if (!Array.isArray(lastChunk) || lastChunk.length === size) {
      chunks.push([item])
    } else {
      lastChunk.push(item)
    }
  })
  return chunks
}

const reverseArray = (array: Array<number>): Array<number> => {
  let reversed: Array<number> = []
  array.forEach((item) => {
    reversed = [item, ...reversed]
  })
  return reversed
}

const reverseWords = (words: string): string =>
  words
    .split(' ')
    .map((word) => word.split('').reverse().join(''))
    .join(' ')

const capitalize = (words: string): string =>
  words
    .split(' ')
    .map((word) => {
      const firstLetter = word.at(0)?.toUpperCase()
      return `${firstLetter}${word.slice(1)}`
    })
    .join(' ')
