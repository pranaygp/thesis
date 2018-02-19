module.exports = n => (() => {
  let ret = ((_c4, _n4) => {
    const from_ = (_a3, _b3) => _a3 > _b3 ? _n4 : _c4(_a3, from_(_a3 + 1, _b3));

    return from_(1, n);
  })((_x, _y) => (_m) => _m ? ((_a4, _b4) => {
    const fn = p => p(_a4, _b4);

    fn._isCons = true;
    return fn;
  })(_x * _x + '', _y(_m - 1)) : null, () => null)(6);

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