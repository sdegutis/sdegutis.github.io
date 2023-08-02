---
title: "Updating Datomic Data"
---

A little while back, Stuart Halloway wrote about [keeping chocolate love atomic](http://blog.datomic.com/2012/08/atomic-chocolate.html).

In that post, he implies that we should re-think our UI so that it doesn't assume update-in-place databases. It's a great idea for the long-term. But in the meantime, some users aren't ready for their UIs to change so drastically.

Here's a compromise: use `cond->` to prepare a transaction that only updates attributes that have changed. If the resulting map is empty, you can just skip the transaction.

```clojure
(let [{:keys [title author body]} params
      attrs (cond-> {}
                    (not= (:news/title news) title)
                    (assoc :news/title title
                           :news/slug (generate-slug title))

                    (not= (:news/author news) author)
                    (assoc :news/author author)

                    (not= (:news/body news) body)
                    (assoc :news/body body))]
  (if (empty? attrs)
    db
    (let [tx (assoc attrs
               :db/id (:db/id news))]
      (-> conn
          (transact [tx])
          (:db-after)))))
```
