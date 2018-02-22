module.exports = n => (() => {
  let ret = ((_c2, _n2) => {
    const from_ = (_a, _b) => _a > _b ? _n2 : _c2(_a, from_(_a + 1, _b));

    return from_(1, n);
  })((_x, _y) => (_m) => _m ? ((_a2, _b2) => {
    const fn = p => p(_a2, _b2);

    fn._isCons = true;
    return fn;
  })(_x, _y(_m - 1)) : null, () => null)(6);

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