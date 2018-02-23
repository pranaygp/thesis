const { take, from } = require('deforest')
module.exports = n => take(10, from(1, n))