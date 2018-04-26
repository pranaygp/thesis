
module.exports = n => (() => {
  let ret = ((_c3, _n3) => {
    let acc = _n3;

    for (let i = n; i >= 1; i--) {
      acc = _c3(i, acc);
    }

    return acc;
  })((_a6, _b2) => ((_a4, _b4) => {
    return p => p(_a4, _b4);
  })((_a6 + 2) * (_a6 + 2), _b2), {
    __isNil: true
  });

  const fst = x => x;

  const snd = (_, y) => y;

  const acc = [];

  while (ret && !ret.__isNil) {
    acc.push(ret(fst));
    ret = ret(snd);
  }

  return acc;
})();