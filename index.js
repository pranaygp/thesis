const t = require("babel-types");
const stripTypesVisitor = require('./stripTypes');

module.exports = function (babel) {
  return {
    visitor: {
      CallExpression(path) {
        let {node} = path;
        if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === 'typedMap') {
          if(node.callee.object.type === 'CallExpression') {
            const upOneChain = node.callee.object;
            if (upOneChain.callee.type === "MemberExpression" && upOneChain.callee.property.type === "Identifier" && upOneChain.callee.property.name === 'typedMap') {

              const f = upOneChain.arguments[0];
              const g = node.arguments[0];

              const a = upOneChain.arguments[1];
              const b = node.arguments[2];

              const fg = t.arrowFunctionExpression(
                [ t.identifier('_') ],
                t.callExpression(
                  g,
                  [t.callExpression(
                    f,
                    [t.identifier('_')]
                  )]
                )
              )

              const replacementTypedMap = t.callExpression(
                t.memberExpression(
                  upOneChain.callee.object,
                  t.identifier('typedMap')
                ),
                [fg, a, b]
              ) 

              path.replaceWith(replacementTypedMap);

            }
          }
        }
      },
      Program: {
        exit(path) {
          path.traverse(stripTypesVisitor);
        }
      }
    }
  };
};