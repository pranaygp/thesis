const { take, from } = require('deforest')
module.exports = n => take(6, from(1, n))