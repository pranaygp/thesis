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
          //   const from_ = (a_, b_) => a_>b_ ? n : c(a_, from_(a_+1, b_))
          //   return from_(a, b)
          // })
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const a_ = path.scope.generateUidIdentifier('a');
          const b_ = path.scope.generateUidIdentifier('b');
          const from = template(`
            build((c, n) => {
              const from_ = (a_, b_) => a_>b_ ? n : c(a_, from_(a_+1, b_))
              return from_(a, b)
            })
          `)
          path.replaceWith(from({
            c, n, a_, b_, a, b
          }))
        }

        // upto
        if(node.callee.type === 'Identifier' && node.callee.name === 'upto') {
          const x = node.arguments[0];
          
          // const upto = x => build((c, n) => {
          //   const from_ = (a_, b_) => a_>b_ ? n : c(a_, from_(a_+1, b_))
          //   return from_(1, x)
          // })
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const a_ = path.scope.generateUidIdentifier('a');
          const b_ = path.scope.generateUidIdentifier('b');
          const upto = template(`
            build((c, n) => {
              const from_ = (a_, b_) => a_>b_ ? n : c(a_, from_(a_+1, b_))
              return from_(1, x)
            })
          `)
          path.replaceWith(upto({
            c, n, a_, b_, x
          }))
        }

        // TODO: repeat
        // if(node.callee.type === 'Identifier' && node.callee.name === 'repeat') {
        //   const x = node.arguments[0];
          
        //   // const repeat = x => build((c, n) => {
        //   //   const r = c(x, r)
        //   //   return r;
        //   // })
        //   const c = path.scope.generateUidIdentifier('c');
        //   const n = path.scope.generateUidIdentifier('n');
        //   const r = path.scope.generateUidIdentifier('r');
        //   const upto = template(`
        //     build((c, n) => {
        //       const r = c(x, r)
        //       return r;
        //     })
        //   `)
        //   path.replaceWith(upto({
        //     c, n, r, x
        //   }))
        // }

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

        // sum
        if(node.callee.type === 'Identifier' && node.callee.name === 'sum') {
          const xs = node.arguments[0];
          
          // const sum = xs => foldr((a, b) => a+b, 0, xs)
          const a = path.scope.generateUidIdentifier('a');
          const b = path.scope.generateUidIdentifier('b');
          const sum = template(`
            foldr((a, b) => a+b, 0, xs)
          `)
          path.replaceWith(sum({
            a, b, xs
          }))
        }

        // take
        if(node.callee.type === 'Identifier' && node.callee.name === 'take') {
          const k = node.arguments[0];
          const xs = node.arguments[1];
          
          // const take = (k, xs) => build((c, n) => foldr((x, y) => m => m ? c(x, y(m-1)) : n, n, xs)(k))
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const x = path.scope.generateUidIdentifier('x');
          const y = path.scope.generateUidIdentifier('y');
          const m = path.scope.generateUidIdentifier('m');
          const take = template(`
            build((c, n) => foldr((x, y) => m => m ? c(x, y(m-1)) : n, () => n, xs)(k))
          `)
          path.replaceWith(take({
            c, n, x, y, m, k, xs
          }))
        }

        // drop
        if(node.callee.type === 'Identifier' && node.callee.name === 'drop') {
          const k = node.arguments[0];
          const xs = node.arguments[1];
          
          // const drop = (k, xs) => build((c, n) => foldr((x, y) => m => m ? y(m-1) : c(x, y(m)), n, xs)(k))
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const x = path.scope.generateUidIdentifier('x');
          const y = path.scope.generateUidIdentifier('y');
          const m = path.scope.generateUidIdentifier('m');
          const take = template(`
            build((c, n) => foldr((x, y) => m => m ? y(m-1) : c(x, y(m)), () => n, xs)(k))
          `)
          path.replaceWith(take({
            c, n, x, y, m, k, xs
          }))
        }

      },
    }
  };
};