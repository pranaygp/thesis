const t = require("babel-types");

module.exports = function () {
  return {
    visitor: {
      CallExpression(path) {
        let {node} = path;

        // foldr..._
        if(node.callee.type === 'Identifier' && node.callee.name === 'foldr') {
          const k = node.arguments[0];
          const z = node.arguments[1];
          const xs = node.arguments[2];
          
          // foldr...build
          if(xs.type === 'CallExpression' && xs.callee.type === 'Identifier' && xs.callee.name === 'build') {
            const g = xs.arguments[0];

            // foldr(k, z, build(g)) -> g(k, z)
            path.replaceWith(
              t.callExpression(g, [k, z])
            )
          }
        }
      },
    }
  };
};