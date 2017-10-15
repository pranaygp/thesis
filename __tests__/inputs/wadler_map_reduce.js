// example from http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps

module.exports = function(n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i+1);
  
  return upto_n
    .typedMap(n => n*n, 'a', 'a')                   // [a] -> [a]   ( a -> a )
    .typedReduce((p, c) => p+c, 'a', 'a')           // [a] -> a     ( a -> a -> a, a )
}