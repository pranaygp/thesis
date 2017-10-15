# Rewrite rules

[] "map/map"    -> forall f g xs. xs.map(f).map(g) = xs.map(_ => g(f(_)))
[] "map/reduce" -> forall f g a xs. xs.map(f).reduce(g, a) = 
