// eslint-disable-next-line no-undef
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [ 'src/**/*.{js,jsx}' ],
    testPathIgnorePatterns: [ '__tests__/msw/' ],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [ '<rootDir>/jest.setup.js' ],
    moduleNameMapper: { '^.+\\.(css|less|scss)$': 'babel-jest' }
};