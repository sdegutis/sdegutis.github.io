---
title: "Clojure Naming Best Practices"
---

Prefer `:require` with `:as`.

Problems with `:refer`, whether using `:all` or not:

1. Your `:require` section will get ridiculously, unreasonably wide.
2. You won't know where symbols are coming from while reading your file.
3. You won't have an easy way to avoid name clashes.
4. It encourages having really verbose names.

Using `:as`, your function names get short and to the point. Instead of `transform-css`, you can write `css/transform`. Also, variable names and namespace aliases won't clash, so you can have things like `(order/id order)`, `(product/name product)`, and `(order/submit {...})`. Nice! Amirite?