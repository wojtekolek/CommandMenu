export const MOBILE_BREAKPOINT = "768px";
export const TABLET_BREAKPOINT = "769px";
export const DESKTOP_BREAKPOINT = "1024px";
export const DESKTOP_FULLHD_BREAKPOINT = "1408px";

export const breakpoints = {
  mobile: MOBILE_BREAKPOINT,
  tablet: TABLET_BREAKPOINT,
  desktop: DESKTOP_BREAKPOINT,
  desktopFullHD: DESKTOP_FULLHD_BREAKPOINT,
} as const;

type BreakpointName = keyof typeof breakpoints;

/**
 * Available breakpoints:
 * - mobile up to 768px
 * - tablet from 769px
 * - desktop from 1024px
 * - desktop FullHD from 1408px
 * @param name - breakpoint name
 * @returns CSS media
 */
export const upTo = (name: BreakpointName) => `
  @media (max-width: ${breakpoints[name]})
`;

/**
 * Available breakpoints:
 * - mobile up to 768px
 * - tablet from 769px
 * - desktop from 1024px
 * - desktop FullHD from 1408px
 * @param name - breakpoint name
 * @returns CSS media
 */
export const from = (name: BreakpointName) => `
  @media (min-width: ${breakpoints[name]})
`;

/**
 * Available breakpoints:
 * - mobile up to 768px
 * - tablet from 769px
 * - desktop from 1024px
 * - desktop FullHD from 1408px
 * @param minName - breakpoint name
 * @param maxName - breakpoint name
 * @returns CSS media
 */
export const between = (minName: BreakpointName, maxName: BreakpointName) => `
  @media (min-width: ${breakpoints[minName]}) and (max-width: ${breakpoints[maxName]})
`;
