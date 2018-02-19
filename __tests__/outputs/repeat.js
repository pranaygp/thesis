module.exports = n => (() => {
  let ret = (() => {
    let _acc = () => null;

    const _l = repeat(42);

    for (let _i = _l.length - 1; _i >= 0; _i--) {
      _acc = (_m) => _m ? ((_a, _b) => {
        const fn = p => p(_a, _b);

        fn._isCons = true;
        return fn;
      })(_l[_i], _acc(_m - 1)) : null;
    }

    return _acc;
  })()(n);

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