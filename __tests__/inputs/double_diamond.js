const {  upto, sum, take, repeat } = require('deforest')
console.log(upto.toString())
module.exports = n => upto(sum(take(n, repeat(1))))