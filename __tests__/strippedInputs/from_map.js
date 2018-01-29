const { build, foldr } = require('../../core');

module.exports = n => map(m => m + '', map(m => m * m, from(1, n)));