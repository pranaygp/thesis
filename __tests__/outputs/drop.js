
module.exports = n => (() => {
  let ret = ((_c4, _n4) => {
    const from_ = (_a3, _b3) => (_p) => _a3 > _b3 ? _n4 : _c4(_a3, (() => {
      const _fn = from_(_a3 + 1, _b3);

      _fn.__isCons = true;
      return _fn;
    })())(_p);

    const fn = from_(1, n);
    fn.__isCons = true;
    return fn;
  })((_x, _y) => (_m) => _m ? _y(_m - 1) : ((_a4, _b4) => {
    const fn = p => p(_a4, _b4);

    fn.__isCons = true;
    return fn;
  })(_x * _x + '', _y(_m)), () => ({
    __isNil: true
  }))(n - 10);

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