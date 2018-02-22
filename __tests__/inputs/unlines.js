const { stringify } = require('../../packages/runtime/index')

module.exports = n => stringify(join(take(n, map(l => l+'\n', map(String.fromCharCode, repeat(97))))))