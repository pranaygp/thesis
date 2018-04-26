const template = require("babel-template");
const t = require("babel-types");

module.exports = function () {
  return {
    visitor: {
      CallExpression(path) {
        const {node} = path;

        // build
        if(node.callee.type === 'Identifier' && node.callee.name === 'build') {
          path.traverse(interruptVisitor);
        }

        // foldr
        if(node.callee.type === 'Identifier' && node.callee.name === 'foldr') {
          path.traverse(interruptVisitor);
        }
      },
    }
  };
};

const interruptVisitor = {
  CallExpression(path){
    const {node} = path;
    // interrupt
    if(node.callee.type === 'Identifier' && node.callee.name === 'interrupt') {
      const arg = node.arguments[0];
      path.replaceWith(arg);
    }
  }
}
