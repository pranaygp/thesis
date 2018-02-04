const template = require("babel-template");
const t = require("babel-types");

module.exports = function () {
  return {
    visitor: {
      CallExpression(path) {
        const {node} = path;

        // build
        if(node.callee.type === 'Identifier' && node.callee.name === 'build') {
          const f = node.arguments[0];

          const a = path.scope.generateUidIdentifier('a');
          const b = path.scope.generateUidIdentifier('b');
          const cons = template(`
            (a, b) => [a, ...b]
          `)
          const nil = t.arrayExpression([]);

          path.replaceWith(t.callExpression(f, [
            cons({a, b}).expression,
            nil
          ]))
        }

        // foldr
        if(node.callee.type === 'Identifier' && node.callee.name === 'foldr') {
          const k = node.arguments[0];
          const z = node.arguments[1];
          const xs = node.arguments[2];

          console.log(k, z);

          // ((k, z, xs) => {
          //   let acc = z;
          //   for(let i = xs.length-1; i>=0; i--){
          //     acc = k(xs[i], acc);
          //   }
          //   return acc;
          // })
          const acc = path.scope.generateUidIdentifier('acc');
          const i = path.scope.generateUidIdentifier('i');
          const foldr = template(`
            (() => {
              let acc = z;
              for(let i = xs.length-1; i>=0; i--){
                acc = k(xs[i], acc);
              }
              return acc;
            })
          `)

          path.replaceWith(foldr({
            k, z, xs, acc, i
          }))
        }
      },
    }
  };
};