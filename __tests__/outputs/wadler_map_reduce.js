// example from http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps
module.exports = n => ((_c2, _n2) => {
  const from_ = (_a3, _b3) => (_c3, _n3) => _a3 > _b3 ? _n3 : _c3(_a3, from_(_a3 + 1, _b3)(_c3, _n3));

  return from_(1, n)(_c2, _n2);
})((_a2, _b2) => _a2 * _a2 + _b2, 0);