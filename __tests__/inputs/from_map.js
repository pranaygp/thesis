const { map, from } = require('deforest')
module.exports = n => map(m => m*m, map(m => m+2, from(1, n)))