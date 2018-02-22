module.exports = n => (() => {
  let ret = ((_c2, _n2) => {
    const _r = (_p) => _c2(42, _r)(_p);

    return _r;
  })((_x, _y) => (_m) => _m ? ((_a, _b) => {
    const fn = p => p(_a, _b);

    fn._isCons = true;
    return fn;
  })(_x, _y(_m - 1)) : null, () => null)(n);

  if (ret._isCons) {
    const acc = [];

    while (ret) {
      acc.push(ret(x => x));
      ret = ret((_, y) => y);
    }

    return acc;
  }

  return ret;
})();