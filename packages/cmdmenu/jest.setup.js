import '@testing-library/jest-dom/extend-expect'

// We need to mock that as `scrollIntoView` is not implemented in jsdom.
// https://github.com/jsdom/jsdom/issues/1695
Element.prototype.scrollIntoView = jest.fn()
