/* eslint-disable no-var */
var enzyme = require('enzyme');
var Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

enzyme.configure({ adapter: new Adapter() });

// for rLogin essentials
jest.mock('@rsksmart/rlogin-dcent-provider', () => ({
  DCentProvider: () => ({}),
}));
