export const spacing = {
  ss0: '0',
  ss1: '8px',
  ss2: '16px',
  ss3: '24px',
  ss4: '32px',
  ss5: '40px',
  ss6: '48px',
  ss7: '56px',
  ss8: '64px',
  ss9: '72px',
  ss10: '128px',
  ss11: '200px'
} as const

export const fontSize = {
  fs1: '12px',
  fs2: '16px',
  fs3: '21px',
  fs4: '32px',
  fs5: '40px',
  fs6: '48px',
  fs7: '88px'
} as const

export const fontWeight = {
  thin: 300,
  regular: 400,
  bold: 600
} as const

export const zIndex = {
  initial: 1,
  onTopOfInitial: 2
} as const

export const radius = {
  rad1: '4px',
  rad2: '8px',
  rad3: '24px'
} as const

export const colors = {
  // primary
  primary: {
    default: '#FFD78A',
    background: '#a4926e'
  },
  // background
  background: {
    primary: '#131313',
    secondary: '#1B1B1B',
    tertiary: '#292929',
    quaternary: '#1F1F1F'
  },
  // text
  text: {
    primary: '#F1F1F1',
    secondary: '#E6E6E6',
    tertiary: '#B8B8B8',
    quaternary: '#808080'
  },
  // rest
  misc: {
    border: '#303030',
    pageGradient: 'radial-gradient(85% 65% at 5% 6%, #313131, #131313)',
    footerGradient: 'linear-gradient(#131313, #383838);',
    separatorGradient: 'linear-gradient(42deg, rgb(66, 66, 66), rgb(216, 179, 100));',
    textDropShadow: 'drop-shadow(#3B3B3B 0px 8px 16px)'
  }
} as const

/**
 * @description Color for box-shadows in HSL
 */
const BOX_SHADOW_COLOR = '0deg 0% 50%'
/**
 * @description We divide the box shadows by elevations
 * Standard box-shadow color is: hsl(0deg 0% 50%)
 */
export const boxShadows = {
  small: `0.5px 1px 1px hsl(${BOX_SHADOW_COLOR} / 0.7)`,
  medium: `
   1px 2px 2px hsl(${BOX_SHADOW_COLOR} / 0.333),
   2px 4px 4px hsl(${BOX_SHADOW_COLOR} / 0.333),
   3px 6px 6px hsl(${BOX_SHADOW_COLOR} / 0.333)
 `,
  large: `
   1px 2px 2px hsl(${BOX_SHADOW_COLOR} / 0.2),
   2px 4px 4px hsl(${BOX_SHADOW_COLOR} / 0.2),
   4px 8px 8px hsl(${BOX_SHADOW_COLOR} / 0.2),
   8px 16px 16px hsl(${BOX_SHADOW_COLOR} / 0.2),
   16px 32px 32px hsl(${BOX_SHADOW_COLOR} / 0.2)
 `,
  highlight: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.05) 0px 1px 0px 0px inset`
} as const
