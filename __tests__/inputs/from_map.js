const { foldr } = require('../../core')

module.exports = n => map(m => m*m, map(m => m+2, from(1, n)))