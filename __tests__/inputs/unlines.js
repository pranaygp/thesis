const { build, foldr } = require('../../core')

module.exports = ls => join(map(l => l+'\n', ls))