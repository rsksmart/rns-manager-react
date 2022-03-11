/* eslint-disable no-var */
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

// mocking TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// for rLogin essentials
jest.mock('@rsksmart/rlogin-dcent-provider', () => ({
  DCentProvider: () => ({}),
}));
