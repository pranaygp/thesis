const { take, repeat } = require('deforest')
module.exports = n => take(n, repeat(42))