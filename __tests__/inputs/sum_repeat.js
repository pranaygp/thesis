const { sum, take, repeat } = require('deforest')
module.exports = n => sum(take(n, repeat(10)))