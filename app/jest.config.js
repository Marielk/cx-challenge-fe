require('jsdom-global/register');

const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './'
})
/** @type{import('jest').Config} */
const config = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}


module.exports = createJestConfig(config)
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/__test__/setupTests.ts'],
//   "bail": 1,
//   "verbose": true
// };
