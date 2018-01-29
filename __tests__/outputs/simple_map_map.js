const { build, foldr } = require('../../core');

module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return build((_c, _n) => ((_c2, _n2) => foldr((_a2, _b2) => _c2((n => n * n)(_a2), _b2), _n2, upto_n))((_a, _b) => _c((n => n + '')(_a), _b), _n));
};