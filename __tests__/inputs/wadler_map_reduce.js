// example from http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps
const { sum, map, upto } = require('deforest')
module.exports = n => sum(map(m => m*m, upto(n)))