// example from http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps

module.exports = function(n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i+1);
  
  upto_n
    .typedMap(n => n*n, 'a', 'a')             // [a] -> [a] 
    .typedMap(n => n + '', 'a', 'b')          // [a] -> [b]
    .typedReduce((p, c) => p+c, 0, 'a', 'a')  // [a], a -> a
}