const esModules = ['ngx-cookie-service'].join('|');
module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular/preprocessor.js'
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  resolver: '@nrwl/builders/plugins/jest/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html', 'cobertura'],
  reporters: ['default', 'jest-junit']
};
