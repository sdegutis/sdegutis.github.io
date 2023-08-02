---
title: "Heroku = epic win"
---

Heroku is just awesome. It lets me avoid tons of ceremony, yak shaving, and boilerplate. With it, I just run `git push heroku master` and suddenly changes to my app are live on the other end.

I tried to use Capistrano to host my website on my own [slice](http://www.slicehost.com/) but the documentation was just too long and dry. Plus every tutorial I found on Cap was assuming my web app had a public git repo somewhere that could be accessed by my server (this will not always be the case).

I really miss Fabric for this kind of thing. It was extremely simple, documentation took an hour from start to finish, and at the end I was a pro at it. (Granted, it probably pales in comparison to Capistrano.) Especially convenient was its `rsync` function which made `fab deploy` super easy.

Total time spent trying to get Cap to work and failing was probably around 90 minutes. Getting my app deployed to Heroku was maybe 3 minutes. Learning how the rest of it worked and getting it set up took maybe 60 minutes total.

Anyway, I think I'll be hosting all of my Ruby web apps on Heroku from now on. Did I mention it's free? With the excellent way it's pricing works, I'll never have to pay a dime unless I manually add more horsepower to my web apps. And if my web apps are at a point where they are so popular that they're failing, then I doubt that'll be a difficult issue to correct.

Overall, Heroku is just great. I'm using it to host this site right now. (Did I mention its "Custom Domain" add-on feature is free so long as you don't require wildcard-subdomains?)