const { adjust, upto } = require('deforest')
module.exports = n => adjust(x => -x, 2, upto(n))