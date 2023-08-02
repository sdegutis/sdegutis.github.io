---
title: "MD5 function in Clojure, with no external dependencies"
---

Let's say you just want to calculate the MD5 hash of a given string in Clojure. No need to pull in an extra dependency just for this:

```clojure
(import '[java.security MessageDigest])

(defn md5 [s]
  (->> (-> (MessageDigest/getInstance "md5")
           (.digest (.getBytes s "UTF-8")))
       (map #(format "%02x" %))
       (apply str)))
```

The brilliant folks in #clojure on freenode helped me to craft this little hack together. Team work makes the dream work! (And it don't seem work!)