const { map, drop, from } = require('deforest')
module.exports = n => map(m => m+'', map(m => m*m, drop(n-10, from(1, n))))