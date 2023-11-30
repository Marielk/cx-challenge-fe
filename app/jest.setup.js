import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import 'raf/polyfill';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;