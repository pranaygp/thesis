const { build, foldr } = require('../../core');

module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return build((_c, _n) => ((_c2, _n2) => ((_c3, _n3) => foldr((_a3, _b3) => _c3((n => n * n)(_a3), _b3), _n3, upto_n))((_a2, _b2) => _c2((n => ({ val: n }))(_a2), _b2), _n2))((_a, _b) => _c((o => o.val + 1)(_a), _b), _n));
};