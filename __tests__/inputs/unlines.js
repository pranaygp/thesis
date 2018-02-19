const { stringify } = require('../../packages/runtime/index')

module.exports = ls => stringify(join(map(l => l+'\n', ls)))