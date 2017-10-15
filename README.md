# Rewrite rules

- [x] "map/map"    -> forall f g xs. xs.map(f).map(g) = xs.map(_ => g(f(_)))

- [ ] "map/reduce" -> forall f g a xs. xs.map(f).reduce(g, a) = ...

# Benchmark tests

```
Starting small test suite (n = 10)
simple_map_map before x 1,189,371 ops/sec ±2.39% (82 runs sampled)
simple_map_map after transform x 1,529,733 ops/sec ±0.96% (88 runs sampled)
Fastest is simple_map_map after transform

Starting medium test suite (n = 200)
simple_map_map before x 93,149 ops/sec ±1.92% (86 runs sampled)
simple_map_map after transform x 119,200 ops/sec ±1.60% (83 runs sampled)
Fastest is simple_map_map after transform

Starting large test suite (n = 1000)
simple_map_map before x 18,628 ops/sec ±2.49% (83 runs sampled)
simple_map_map after transform x 24,633 ops/sec ±0.83% (88 runs sampled)
Fastest is simple_map_map after transform
```