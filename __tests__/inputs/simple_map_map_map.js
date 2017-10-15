module.exports = function(n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i+1);
  
  return upto_n
    .typedMap(n => n*n, 'a', 'a')               // [a] -> [a]   ( a -> a )
    .typedMap(n => ({val: n}), 'a', 'b')        // [a] -> [b]   ( a -> b )
    .typedMap(o => o.val+1, 'b', 'a')           // [b] -> [a]   ( b -> a )
}