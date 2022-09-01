module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  coverageReporters: ['lcovonly', 'text-summary'],
  coverageProvider: 'babel',
  moduleFileExtensions: ['ts', 'tsx', 'jsx', 'js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/?(*.)+(spec).ts?(x)'],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
}
