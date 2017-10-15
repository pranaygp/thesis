const t = require("babel-types");

module.exports = function (babel) {
  return {
    visitor: {
      CallExpression(path) {
        let {node} = path;
        if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === 'typedMap') {
          console.log('found a call to typedMap');
          if(node.callee.object.type === 'CallExpression') {
            const upOneChain = node.callee.object;
            if (upOneChain.callee.type === "MemberExpression" && upOneChain.callee.property.type === "Identifier" && upOneChain.callee.property.name === 'typedMap') {

              console.log('this typedMap is the result of a chained typedMap');
              // console.log('arguments: ', upOneChain.arguments);

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

              // node.arguments[0] = fg;
              // node.arguments[2] = b;
              // node.callee.object = node;
              // upOneChain = null;
              // path.remove();

            }
          }
        }
      }
    }
  };
};