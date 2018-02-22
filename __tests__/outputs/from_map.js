module.exports = n => (() => {
  let ret = ((_c3, _n3) => {
    const from_ = (_a3, _b3) => _a3 > _b3 ? _n3 : _c3(_a3, from_(_a3 + 1, _b3));

    return from_(1, n);
  })((_a6, _b2) => ((_a4, _b4) => {
    const fn = p => p(_a4, _b4);

    fn._isCons = true;
    return fn;
  })((_a6 + 2) * (_a6 + 2), _b2), null);

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