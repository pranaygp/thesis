const { stringify } = require('../../core');

module.exports = ls => stringify((() => {
  let _acc = [];
  let _l = ls;

  for (let _i = _l.length - 1; _i >= 0; _i--) {
    _acc = (() => {
      let _acc2 = _acc;

      let _l2 = _l[_i] + '\n';

      for (let _i2 = _l2.length - 1; _i2 >= 0; _i2--) {
        _acc2 = [_l2[_i2], ..._acc2];
      }

      return _acc2;
    })();
  }

  return _acc;
})());