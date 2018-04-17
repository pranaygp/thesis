
module.exports = n => ((_c2, _n2) => {
  const from_ = (_a3, _b3) => (_p) => _a3 > _b3 ? _n2 : _c2(_a3, (() => {
    const _fn = from_(_a3 + 1, _b3);

    _fn.__isCons = true;
    return _fn;
  })())(_p);

  const fn = from_(1, n);
  fn.__isCons = true;
  return fn;
})((_a2, _b2) => _a2 * _a2 + _b2, 0); // example from http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps