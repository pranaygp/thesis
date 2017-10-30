# Rewrite rules

- [x] "map/map"    -> forall f g xs. xs.map(f).map(g) = xs.map(_ => g(f(_)))

- [x] "map/reduce" -> forall f g a xs. xs.map(f).reduce(g, a) = xs.reduce(($, \_) => g($, f(_)), a)

# Benchmark tests

```
Starting benchmark test for simple_map_map.js
Avg. memory usage before: 70440086 bytes
simple_map_map.js before x 0.96 ops/sec ±2.06% (7 runs sampled)
Avg. memory usage after: 76091840 bytes
simple_map_map.js after x 1.39 ops/sec ±2.10% (8 runs sampled)
Fastest is simple_map_map.js after

Starting benchmark test for simple_map_map_map.js
Avg. memory usage before: 93419741 bytes
simple_map_map_map.js before x 0.77 ops/sec ±5.89% (6 runs sampled)
Avg. memory usage after: 64506002 bytes
simple_map_map_map.js after x 2.25 ops/sec ±2.03% (10 runs sampled)
Fastest is simple_map_map_map.js after

Starting benchmark test for wadler_map_reduce.js
Avg. memory usage before: 66600393 bytes
wadler_map_reduce.js before x 2.43 ops/sec ±5.19% (11 runs sampled)
Avg. memory usage after: 32446848 bytes
wadler_map_reduce.js after x 23.55 ops/sec ±0.92% (42 runs sampled)
Fastest is wadler_map_reduce.js after
```

# How to detect if a function is pure (or _referentially transparent_)[1]

1. It only reads parameters and locals;*
2. It only writes locals;
3. On non-locals, it calls only pure functions; (doesn't this definition forget impure local function declarations)
4. All functions it calls implicitly are pure, e.g., `toString`; 
5. It only writes properties of locals if they do not alias non-locals;**

\* -> I think we can allow non-locals that are defined as constants

** -> Aliasing is not possible to determine in JS in the general case because you can look up properties dynamically (`object['property']`). Provided that isn't done in the function, and we have the entire source of the program, we can handle this. I guess what we need to do, is follow the property that we're trying to write to, and see where it's defined, and figure out if writing to this property affects memory OUTSIDE the function scope.

We also need to store information on the purity of some functions (for instance, know that `console.log` is impure). Also, if we determine that a function is pure, can we just do a cache lookup instead of recursively checing for this (refer to point 3 in the list above).

# Potential issues

* In a non-lazy language, it is possible to convert a function that doens't terminate into one that does using Wadler's deforestation algorithm [2]

# Things I'm reading

* [https://search.proquest.com/docview/303342238/](https://search.proquest.com/docview/303342238/)
* [http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps](http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps)
* [http://research.microsoft.com/en-us/um/people/simonpj/papers/deforestation-short-cut.pdf](http://research.microsoft.com/en-us/um/people/simonpj/papers/deforestation-short-cut.pdf)
* [https://www.microsoft.com/en-us/research/wp-content/uploads/2001/09/rules.pdf](https://www.microsoft.com/en-us/research/wp-content/uploads/2001/09/rules.pdf)

# References
[1] [https://softwareengineering.stackexchange.com/questions/176761/compute-if-a-function-is-pure](https://softwareengineering.stackexchange.com/questions/176761/compute-if-a-function-is-pure)]

[2] [http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps](http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps)