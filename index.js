const inliner = require('./inliner');
const build_foldr = require('./build_foldr');
const build_inliner = require('./build_inliner');
const beta_reducer = require('./beta_reducer');

module.exports = function (babel) {
  return {
    visitor: {
      Program: {
        enter(path) {
          path.traverse(inliner().visitor);
          path.traverse(build_foldr().visitor);
          path.traverse(build_inliner().visitor);
          path.traverse(beta_reducer().visitor);
        }
      }
    }
  };
};