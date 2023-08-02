---
title: "Template function in Clojure, with no external dependencies"
---

Let's say you just need to replace some variables in a string based on a map, and don't need any escaping behavior or special logic:

```clojure
(template "foo {{bar}} {{bar}} {{quux}}"
          {:bar "x"
           :quux "y"})

;=> "foo x x y"
```

It's pretty easy to implement using `reduce`:

```clojure
(defn template [s m]
  (reduce (fn [s [k v]]
            (str/replace s
                         (format "{{%s}}"
                                 (name k))
                         v))
          s
          m))

```