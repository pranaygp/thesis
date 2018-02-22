const { stringify } = require('../../packages/runtime/index');

module.exports = n => stringify((() => {
  let ret = ((_c5, _n5) => {
    const _r = (_p) => _c5(97, _r)(_p);

    _r._isCons = true;
    return _r;
  })((_a2, _b2) => (_m) => _m ? (() => {
    let _acc = _b2(_m - 1);

    const _l = String.fromCharCode(_a2) + '\n';

    for (let _i = _l.length - 1; _i >= 0; _i--) {
      _acc = ((_a3, _b3) => {
        const fn = p => p(_a3, _b3);

        fn._isCons = true;
        return fn;
      })(_l[_i], _acc);
    }

    return _acc;
  })() : null, () => null)(n);

  if (ret._isCons) {
    const acc = [];

    while (ret) {
      acc.push(ret(x => x));
      ret = ret((_, y) => y);
    }

    return acc;
  }

  return ret;
})());