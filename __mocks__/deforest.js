const R = require('ramda');

// Convert an array of chars to a string
const stringify = xs => xs.join('')

const from = (x, y) => R.unfold(n => n <= y && [n, n+1], x)
const upto = x => from(1, x)

const repeat = x => R.repeat(x, 1e4)

module.exports = {
  ...R,
  from,
  upto,
  repeat,
  join: R.unnest,
  stringify
}