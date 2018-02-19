module.exports = n => (() => {
  let ret = ((_c2, _n2) => {
    const closure = {
      repeat_() {
        return _c2(4, (() => {
          const fn = this.repeat_.bind(closure);
          fn._isNestedCons = true;
          return fn;
        })());
      }

    };
    return closure.repeat_.call(closure);
  })((_x, _y) => (_m) => _m ? ((_a, _b) => {
    const fn = p => p(_a, _b);

    fn._isCons = true;
    return fn;
  })(_x, _y(_m - 1)) : null, () => null)(5);

  if (ret._isCons || ret._isNestedCons) {
    const acc = [];

    while (ret) {
      if (ret._isNestedCons) {
        ret = ret();
      }

      ;
      acc.push(ret(x => x));
      ret = ret((_, y) => y);
    }

    return acc;
  }

  return ret;
})();