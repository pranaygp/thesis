const { sum, map } = require('deforest')
module.exports = function(n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i+1);

  return sum(map(x => -x,  upto_n))
}