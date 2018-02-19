const inliner = require('./inliner');
const foldr_build = require('./foldr_build');
const build_foldr = require('./build_foldr');
const post_inliner = require('./post_inliner');
const beta_reducer = require('./beta_reducer');

module.exports = function (babel) {
  return {
    visitor: {
      Program: {
        enter(path) {
          path.traverse(inliner().visitor);
          path.traverse(foldr_build().visitor);
          // path.traverse(build_foldr().visitor);
          path.traverse(post_inliner().visitor);
          path.traverse(beta_reducer().visitor);
        }
      }
    }
  };
};