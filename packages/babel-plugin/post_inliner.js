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
          // const p = path.scope.generateUidIdentifier('p');
          // const cons = template(`
          //   (a, b) => {
          //     const fn = p => p(x, y);
          //     fn.toString = function() {
          //         var nested = !!arguments.length;
          //         var output = (nested ? x : "(" + x) + " ";
          //         output += y ? y.toString(true) : "";
          //         if (!nested) {
          //             output = output.substring(0, output.length - 1) + ")";
          //         }
          //         return output;
          //     };
          //     return fn;
          //   }
          // `)
          const nil = t.arrayExpression([]);
          // const nil = t.nullLiteral();

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

          // ((k, z, xs) => {
          //   let acc = z;
          //   let l = xs;
          //   for(let i = xs.length-1; i>=0; i--){
          //     acc = k(l[i], acc);
          //   }
          //   return acc;
          // })()
          const acc = path.scope.generateUidIdentifier('acc');
          const l = path.scope.generateUidIdentifier('l');
          const i = path.scope.generateUidIdentifier('i');
          const foldr = template(`
            (() => {
              let acc = z;
              let l = xs;
              for(let i = l.length-1; i>=0; i--){
                acc = k(l[i], acc);
              }
              return acc;
            })()
          `)

          path.replaceWith(foldr({
            k, z, xs, acc, l, i
          }))
        }
      },
    }
  };
};