
module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return (() => {
    let ret = (() => {
      let _acc = {
        __isNil: true
      };
      const _l = upto_n;

      const cons = (a, b) => p => p(a, b)
      
      for (let _i = _l.length - 1; _i >= 0; _i--) {
        _acc = cons(_l[_i] * _l[_i] + '', _acc);
      }

      return _acc;
    })();

    const fst = x => x;

    const snd = (_, y) => y;

    const acc = [];

    while (ret && !ret.__isNil) {
      acc.push(ret(fst));
      ret = ret(snd);
    }

    return acc;
  })();
};