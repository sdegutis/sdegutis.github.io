---
title: "Idiomatic Ruby leads to FP"
---

Idiomatic Ruby encourages a Functional Programming style by discouraging variables and encouraging functions.

For example, if you have a variable named `stuff` and realize that it is constructed fairly simply, either using instance variables or no variables at all, and you use it later in that procedure via `this = stuff.trim`, then you can easily refactor `stuff` into its own method. Thanks to Ruby, the previous `this = stuff.trim` line still works exactly as expected! Instead of being a variable, `stuff` is a method call which returns the last expression evaluated within the method.

Similarly, with traversal methods like `each`, `map`, etc, Ruby makes for-loops awkward and difficult, and makes functions with almost no variables very natural.

Just sayin'...