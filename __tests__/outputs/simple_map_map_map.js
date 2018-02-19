module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return (() => {
    let ret = (() => {
      let _acc = null;
      const _l = upto_n;

      for (let _i = _l.length - 1; _i >= 0; _i--) {
        _acc = ((_a4, _b4) => {
          const fn = p => p(_a4, _b4);

          fn._isCons = true;
          return fn;
        })({ val: _l[_i] * _l[_i] }.val + 1, _acc);
      }

      return _acc;
    })();

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
};