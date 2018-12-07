exports.config = {
  'packages': {
    'devDependencies': ['jest', '@types/jest', 'ts-jest']
  },
  'scripts': {
    'test:unit': 'jest test/unit --projects ./test/unit/jest.config.ts'
  }
};
