module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return upto_n.map(n => n * n) // [a] -> [a]   ( a -> a )
  .map(n => ({ val: n })) // [a] -> [b]   ( a -> b )
  .map(o => o.val + 1); // [b] -> [a]   ( b -> a )
};