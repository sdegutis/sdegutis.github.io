---
title: "Blog administration"
---

Finally I have written my own blog engine, and I really like the whole site. But there's one major problem I still have left untouched: administration.

The question is, **how should I implement administrative functionality?** And honestly, I'm not sure. There's a few option.

One option is to write an "admin" section of my site, which lists all the entries, comments, tags, and categories, and allows me to perform CRUD operations on each as necessary. A big reason I dislike this option is because it requires a ton of duplication, thus violating DRY. The only way to prevent this is to enforce a strict structure, much like Rails does, but that greatly reduces flexibility, plus it seems like more work than it's worth. Plus, I would have to add styling to an administration page to make it look presentable, which contradictorily feels both necessary and pointless.

Another option is simply to implement "edit/delete" buttons (or links) right next to each entry _directly in the user-facing interface_. It's a bit ugly when the user sees them; however, I could hide them when the user is not authenticated. That would leave the only problem being that certain links/buttons, such as "Create \_\_\_" would have no natural placement, and thus would need to be either inserted awkwardly at the top or bottom of any given page, or they could be placed in an Admin page. That would be even weirder than the first option though, since we would have both an Admin page and links littered throughout the actual site.

Either of those options would leave one large problem: the client side and the server side are still required to be separated, even though the act of administration is inherently non-user-facing. Thus, just to get the administration to work in the first place would require _much_ more boilerplate code than I would be willing to put in. In fact, it makes using `heroku console` to edit my database seems like a walk in the park.

The final option is to just make a desktop app that performs administration. The idea is that the database would be downloaded in its entirety, modified to a desired end, and then uploaded in its entirety. Styling would thus no long necessary since Cocoa mostly does everything right by default. And even more importantly, all of the logic would be centralized: the "client" and "server" side are combined. Thus, the interface can access and modify the model with practically no ceremony at all. No jQuery scripts, no extra URL routes, nothing.

These reasons make this option my favorite so far. However, it's not really practical. For example, if I want to write a new entry, during the time between downloading and uploading the database (let's say it takes 1 minute total), a reader could have posted a comment which would then be overwritten into oblivion when the upload is performed. This _might_ be remedied by fetching data live from the server within the interface, and sending updates to the server upon each modification, both being much like how Tweetie acts when you use it to view a new user or their details, or post a new tweet. However, that still requires that the server-side be fitted to serve/receive each type of information, which is still more ceremony than none, and thus not great, and even possibly a little fragile.

Not to mention, taking the problem to a desktop client suddenly requires more security, in the sense that SSL or something would need to be enforced, or else a big security hole lurks.

Overall, I can't think of any solution that feels clean and doesn't make me violate at least some good practices and coding principles. Any feedback on this issue is very welcome :)