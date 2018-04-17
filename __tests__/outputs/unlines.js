const { stringify, } = require('deforest');

module.exports = n => stringify((() => {
  let ret = ((_c5, _n5) => {
    const _r = (_p) => _c5(97, _r)(_p);

    _r.__isCons = true;
    return _r;
  })((_a2, _b2) => (_m) => _m ? (() => {
    let _acc = _b2(_m - 1);

    const _l = String.fromCharCode(_a2) + '\n';

    for (let _i = _l.length - 1; _i >= 0; _i--) {
      _acc = ((_a3, _b3) => {
        const fn = p => p(_a3, _b3);

        fn.__isCons = true;
        return fn;
      })(_l[_i], _acc);
    }

    return _acc;
  })() : {
    __isNil: true
  }, () => ({
    __isNil: true
  }))(n);

  if (ret.__isCons) {
    const acc = [];

    while (ret && ret.__isCons) {
      const fst = ret(x => x);
      const snd = ret((_, y) => y);

      if (fst && !fst.__isNil) {
        acc.push(fst);
      }

      ret = snd;
    }

    return acc;
  }

  return ret;
})());