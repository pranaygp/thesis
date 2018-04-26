
module.exports = n => ((_c2, _n2) => {
  let acc = _n2;

  for (let i = n; i >= 1; i--) {
    acc = _c2(i, acc);
  }

  return acc;
})((_a2, _b2) => _a2 * _a2 + _b2, 0); // example from http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps