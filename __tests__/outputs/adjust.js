
module.exports = n => (() => {
  let ret = ((_c2, _n2) => {
    const from_ = (_a, _b) => (_p) => _a > _b ? _n2 : _c2(_a, (() => {
      const _fn = from_(_a + 1, _b);

      _fn.__isCons = true;
      return _fn;
    })())(_p);

    const fn = from_(1, n);
    fn.__isCons = true;
    return fn;
  })((_x, _y) => (_m) => _m === 0 ? ((_a2, _b2) => {
    const fn = p => p(_a2, _b2);

    fn.__isCons = true;
    return fn;
  })(-_x, _y(_m - 1)) : ((_a2, _b2) => {
    const fn = p => p(_a2, _b2);

    fn.__isCons = true;
    return fn;
  })(_x, _y(_m - 1)), () => ({
    __isNil: true
  }))(2);

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