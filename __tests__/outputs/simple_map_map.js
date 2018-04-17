
module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return (() => {
    let ret = (() => {
      let _acc = {
        __isNil: true
      };
      const _l = upto_n;

      for (let _i = _l.length - 1; _i >= 0; _i--) {
        _acc = ((_a3, _b3) => {
          const fn = p => p(_a3, _b3);

          fn.__isCons = true;
          return fn;
        })(_l[_i] * _l[_i] + '', _acc);
      }

      return _acc;
    })();

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
};