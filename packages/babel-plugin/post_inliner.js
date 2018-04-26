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
            (a, b) => {
              return p => p(a, b);
            }
          `);
          const nil = t.objectExpression([
            t.objectProperty(
              t.identifier('__isNil'),
              t.booleanLiteral(true)
            )
          ])

          const build = template(`
            f(c, n)
          `);

          path.replaceWith(build({f, c: cons({a, b}).expression, n: nil}))
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
              const l = xs;
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

        // interrupt
        if(node.callee.type === 'Identifier' && node.callee.name === 'interrupt') {
          const arg = node.arguments[0];

          // (() => {
          //   let ret = arg;
          //   if(ret.__isCons) {
          //     const acc = [];
          //     while(ret && ret.__isCons){
          //       const fst = ret(x => x);
          //       const snd = ret((_, y) => y);
          //       if(fst && !fst.__isNil) {
          //         acc.push(fst);
          //       }
          //       ret = snd;
          //     }
          //     return acc;
          //   }
          //   return ret;
          // })()
          const interrupt = template(`
            (() => {
              let ret = arg;
              const fst = x => x;
              const snd = (_, y) => y;
              const acc = [];
              while(ret && !ret.__isNil) {
                acc.push(ret(fst));
                ret = ret(snd);
              }
              return acc;
            })()
          `)

          path.replaceWith(interrupt({
            arg
          }))
        }
      },
    }
  };
};