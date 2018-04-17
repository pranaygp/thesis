
module.exports = n => (() => {
  let ret = ((_c2, _n2) => {
    const _r = (_p) => _c2(42, _r)(_p);

    _r.__isCons = true;
    return _r;
  })((_x, _y) => (_m) => _m ? ((_a, _b) => {
    const fn = p => p(_a, _b);

    fn.__isCons = true;
    return fn;
  })(_x, _y(_m - 1)) : {
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
})();