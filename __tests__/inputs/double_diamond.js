const {  upto, sum, take, repeat } = require('deforest')
module.exports = n => upto(sum(take(n, repeat(1))))