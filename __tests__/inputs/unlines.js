const { foldr, stringify } = require('../../core')

module.exports = ls => stringify(join(map(l => l+'\n', ls)))