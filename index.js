const inliner = require('./inliner');
const build_foldr = require('./build_foldr');

module.exports = function (babel) {
  return {
    visitor: {
      Program: {
        enter(path) {
          path.traverse(inliner().visitor);
          path.traverse(build_foldr().visitor);
        }
      }
    }
  };
};