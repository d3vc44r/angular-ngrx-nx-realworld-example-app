module.exports = {
  name: 'frontendinit',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/frontendinit',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ]
};
