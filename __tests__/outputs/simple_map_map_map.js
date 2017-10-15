// example from http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps

module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  upto_n.map(_ => (_ => (o => o.val + 1)((n => ({ val: n }))(_)))((n => n * n)(_))); // [b] -> [a]   ( b -> a )
};