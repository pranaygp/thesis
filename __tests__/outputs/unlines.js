const { foldr, stringify } = require('../../core');

module.exports = ls => stringify(((() => {
  let _acc = [];

  for (let _i = ls.length - 1; _i >= 0; _i--) {
    _acc = ((() => {
      let _acc2 = _acc;

      for (let _i2 = (ls[_i] + '\n').length - 1; _i2 >= 0; _i2--) {
        _acc2 = ([((ls[_i]) => ls[_i] + '\n')(ls[_i])[_i2], ..._acc2]);
      }

      return _acc2;
    }));
  }

  return _acc;
})));