const t = require("babel-types");
const stripTypesVisitor = require('./stripTypes');

module.exports = function (babel) {
  return {
    visitor: {
      CallExpression(path) {
        let {node} = path;
        // xs.SOMETHING().typedMap()...
        if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === 'typedMap') {
          if(node.callee.object.type === 'CallExpression') {
            const upOneChain = node.callee.object;
            // xs.typedMap().typedMap()...
            if (upOneChain.callee.type === "MemberExpression" && upOneChain.callee.property.type === "Identifier" && upOneChain.callee.property.name === 'typedMap') {

              const f = upOneChain.arguments[0];
              const g = node.arguments[0];

              const a = upOneChain.arguments[1];
              const b = node.arguments[2];

              const gf = t.arrowFunctionExpression(
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
                [gf, a, b]
              ) 

              path.replaceWith(replacementTypedMap);

            }
          }
        }

        // xs.SOMETHING().typedReduce()...
        if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === 'typedReduce') {
          if(node.callee.object.type === 'CallExpression') {
            const upOneChain = node.callee.object;
            // xs.typedMap().typedReduce()...
            if (upOneChain.callee.type === "MemberExpression" && upOneChain.callee.property.type === "Identifier" && upOneChain.callee.property.name === 'typedMap') {

              const f = upOneChain.arguments[0];
              const g = node.arguments[0];
              const initVal = node.arguments[1]

              const a = upOneChain.arguments[1];
              const b = node.arguments[3];

              const gf = t.arrowFunctionExpression(
                [t.identifier('$'), t.identifier('_')],
                t.callExpression(
                  g,
                  [
                    t.identifier('$'),
                    t.callExpression(
                      f,
                      [t.identifier('_')]
                    )
                  ]
                )
              )

              const replacementTypedReduce = t.callExpression(
                t.memberExpression(
                  upOneChain.callee.object,
                  t.identifier('typedReduce')
                ),
                [gf, initVal, a, b]
              )

              path.replaceWith(replacementTypedReduce);
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