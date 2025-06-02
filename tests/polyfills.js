// mocking TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// polyfill ReadableStream
const { ReadableStream } = require('web-streams-polyfill');

global.ReadableStream = ReadableStream;
