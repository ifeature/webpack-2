import './index.styl';
import './index.html';

import sayHi from './legacy.js';
const greeting = (name) => `Hello, ${name}!`;

const s = sayHi;
