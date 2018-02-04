const { foldr } = require('../../core');

module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return (() => {
    let _acc = [];
    let _l = upto_n;

    for (let _i = _l.length - 1; _i >= 0; _i--) {
      _acc = [_l[_i] * _l[_i] + '', ..._acc];
    }

    return _acc;
  })();
};