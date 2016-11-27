import './index.styl';
import './index.html';

import template from './main.hbs';

import sayHi from './legacy.js';
const greeting = (name) => `Hello, ${name}!`;

const s = sayHi;

console.log(_.isEqual(1, 2));
console.log(template({name: 'Artem'}));
