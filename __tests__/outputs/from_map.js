const { foldr } = require('../../core');

module.exports = n => ((((_c3, _n3) => {
  const from_ = (_a3, _b3) => (_c4, _n4) => _a3 > _b3 ? _n4 : _c4(_a3, from_(_a3 + 1, _b3)(_c4, _n4));

  return from_(1, n)(_c3, _n3);
})((_a7, _b2) => (([((_a7 + 2) * (_a7 + 2)), ..._b2])), [])));