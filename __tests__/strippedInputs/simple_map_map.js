module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return upto_n.map(n => n * n) // [a] -> [a]   ( a -> a )
  .map(n => n + ''); // [a] -> [b]   ( a -> b )
};