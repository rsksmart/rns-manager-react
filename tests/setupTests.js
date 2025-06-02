/* eslint-disable no-var */
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

// for rLogin essentials
jest.mock('@rsksmart/rlogin-dcent-provider', () => ({
  DCentProvider: () => ({}),
}));
