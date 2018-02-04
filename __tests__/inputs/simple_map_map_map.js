const { foldr } = require('../../core')

module.exports = function(n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i+1);

  return map(
    o => o.val+1, map(
      n => ({val: n}), map(
        n => n*n, 
        upto_n
      )
    )
  ) 
}