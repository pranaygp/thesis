module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return upto_n.map(_ => (_ => (o => o.val + 1)((n => ({ val: n }))(_)))((n => n * n)(_))); // [b] -> [a]   ( b -> a )
};