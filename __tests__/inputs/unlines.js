const { stringify, join, take, map, repeat } = require('deforest')

module.exports = n => stringify(join(take(n, map(l => l+'\n', map(String.fromCharCode, repeat(97))))))