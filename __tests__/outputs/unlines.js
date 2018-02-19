const { stringify } = require('../../packages/runtime/index');

module.exports = ls => stringify((() => {
  let ret = (() => {
    let _acc = null;
    const _l = ls;

    for (let _i = _l.length - 1; _i >= 0; _i--) {
      _acc = (() => {
        let _acc2 = _acc;

        const _l2 = _l[_i] + '\n';

        for (let _i2 = _l2.length - 1; _i2 >= 0; _i2--) {
          _acc2 = ((_a2, _b2) => {
            const fn = p => p(_a2, _b2);

            fn._isCons = true;
            return fn;
          })(_l2[_i2], _acc2);
        }

        return _acc2;
      })();
    }

    return _acc;
  })();

  if (ret._isCons || ret._isNestedCons) {
    const acc = [];

    while (ret) {
      if (ret._isNestedCons) {
        ret = ret();
      }

      ;
      acc.push(ret(x => x));
      ret = ret((_, y) => y);
    }

    return acc;
  }

  return ret;
})());