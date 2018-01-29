const { build, foldr } = require('../../core');

module.exports = function (n) {
  return map(n => n + '', map(n => n * n, from(1, n)));
};