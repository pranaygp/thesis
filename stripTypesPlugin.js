const stripTypesVisitor = require('./stripTypes');

module.exports = function (babel) {
  return {
    visitor: stripTypesVisitor
  }
}