module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '!lib/*.js',
    '!src/*.svg',
    '!src/*.scss',
    '!src/*.less',
    '!lib/**/*.js',
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.mock.{js,jsx,ts,tsx}',
    '!src/**/*.constant.{js,jsx,ts,tsx}',
    '!.rollup.cache'
  ],
  coverageDirectory: '.jest_coverage/',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  globals: {
    IntersectionObserver: true,
    ResizeObserver: true,
    innerWidth: true
  },
  moduleFileExtensions: ['js', 'jsx', 'es6', 'ts', 'tsx'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  setupFilesAfterEnv: [
    '../../etc/jest/enzyme.config.ts',
    '@testing-library/jest-dom/extend-expect',
    'jest-canvas-mock'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.es6$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest'
  },
  transformIgnorePatterns: ['node_modules/']
};
