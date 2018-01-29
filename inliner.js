const template = require("babel-template");
const t = require("babel-types");

module.exports = function () {
  return {
    visitor: {
      CallExpression(path) {
        let {node} = path;

        // map
        if(node.callee.type === 'Identifier' && node.callee.name === 'map') {
          const f = node.arguments[0];
          const xs = node.arguments[1];
          
          // const map = (f, xs) => build((c, n) => foldr((a, b) => c(f(a), b), n, xs))
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const a = path.scope.generateUidIdentifier('a');
          const b = path.scope.generateUidIdentifier('b');
          const map = template(`
            build((c, n) => foldr((a, b) => c(f(a), b), n, xs))
          `)
          path.replaceWith(map({
            c, n, a, b, f, xs
          }))
        }

        // from
        if(node.callee.type === 'Identifier' && node.callee.name === 'from') {
          const a = node.arguments[0];
          const b = node.arguments[1];
          
          // const from = (a, b) => build((c, n) => {
          //   const from_ = (a_, b_) => (c_, n_) => a_>b_ ? n_ : c_(a_, from_(a_+1, b_)(c_, n_))
          //   return from_(a, b)(c, n)
          // })
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const c_ = path.scope.generateUidIdentifier('c');
          const n_ = path.scope.generateUidIdentifier('n');
          const a_ = path.scope.generateUidIdentifier('a');
          const b_ = path.scope.generateUidIdentifier('b');
          const from = template(`
            build((c, n) => {
              const from_ = (a_, b_) => (c_, n_) => a_>b_ ? n_ : c_(a_, from_(a_+1, b_)(c_, n_))
              return from_(a, b)(c, n)
            })
          `)
          path.replaceWith(from({
            c, n, c_, n_, a_, b_, a, b
          }))
        }

        // join
        if(node.callee.type === 'Identifier' && node.callee.name === 'join') {
          const xs = node.arguments[0];
          
          // const join = xs => build((c, n) => foldr((x, y) => foldr(c, y, x), n, xs))
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const x = path.scope.generateUidIdentifier('x');
          const y = path.scope.generateUidIdentifier('y');
          const join = template(`
            build((c, n) => foldr((x, y) => foldr(c, y, x), n, xs))
          `)
          path.replaceWith(join({
            c, n, x, y, xs
          }))
        }
      },
    }
  };
};