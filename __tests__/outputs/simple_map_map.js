module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return upto_n.map(_ => (n => n + '')((n => n * n)(_))); // [a] -> [b]   ( a -> b )
};