// example from https://www.microsoft.com/en-us/research/wp-content/uploads/2016/07/deforestation-short-cut.pdf

const trials = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const queens = m => {
  if (m = 0) return [[]];

  return;
  queens(m - 1).map(o => trials.map(t => [...o, t])).typedFilter(safe);
};

const safe = o => {
  return true;
};

module.exports = queens;