
module.exports = n => (() => {
  let ret = ((_c, _n) => {
    const from_ = (_a, _b) => (_p) => _a > _b ? _n : _c(_a, (() => {
      const _fn = from_(_a + 1, _b);

      _fn.__isCons = true;
      return _fn;
    })())(_p);

    const fn = from_(1, ((_c3, _n3) => {
      const _r = (_p2) => _c3(1, _r)(_p2);

      _r.__isCons = true;
      return _r;
    })((_x, _y) => (_m) => _m ? _x + _y(_m - 1) : 0, () => 0)(n));
    fn.__isCons = true;
    return fn;
  })((_a3, _b3) => {
    const fn = p => p(_a3, _b3);

    fn.__isCons = true;
    return fn;
  }, {
    __isNil: true
  });

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