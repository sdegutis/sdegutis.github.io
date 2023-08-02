---
title: "Using Objective-C for iOS instead of Swift"
---

When we started working on[Accomplish](http://penandpapersoftware.com/accomplish/), our minimalist Todo list app for iPhone, we had to decide on a language early on. We chose Objective-C instead of Swift.

Given the fact that all modern tutorials and blog posts and pretty much everything is focusing on Swift now, and that all signs point to Swift being the long-term future of iOS development, we thought we'd explain why we made such an "unconventional" choice:

### Familiarity

The most obvious reason is that I'm familiar with it, having written in it for over 10 years. Swift doesn't look that hard to learn, but when I have zero spare time to learn something unnecessary, even one minute is one minute too many.

### Xcode integration

As an early adopter of Swift, I experienced first hand how buggy the early Xcode integration was, with the constant crashes of the syntax highlighting and autocomplete engine. That was years ago, and it's gotten better, but it still has a while to go before it's as good as the Objective-C interface.

### Small binary size = Fast download

Most users have pretty fast internet connection at home, but not everyone has fast internet on the go. Taking a long time to download and install an app might just be enough to bias a user against the app. Our app [Accomplish](http://penandpapersoftware.com/accomplish/)is only 289 KB, and downloads very fast. If it was written in Swift, it would have the Swift runtime embedded into the app, bloating it by megabytes and slowing the download speed.

Not naming names, but our competition are 84.5 MB, 66.5 MB, 66.4 MB, 71 MB, and even our most minimalist competing app is a whopping 8.8 MB. Users might not necessarily leave a review explaining that "this app took too long to download so I just gave up on it", and they might not admit that it gave them a bad first impression, but as a user of many apps myself, I know that it's annoying when an app takes a while to install, and a pleasant surprise when it installs immediately.

### Objective-C is Good Enough™

Swift brings a lot of really cool new features, especially related to safety and correctness. The nerd in me really wants to spend that extra time (re)learning Swift. But ultimately Objective-C is like UNIX in the sense that it's "good enough", and although Swift is better in some ways, all the above reasons win out for the time being.

### Legitimate flaws in Objective-C

There are some legitimate flaws Objective-C, which Swift solves, but which can be worked around without switching languages. I'll be doing a series of blog posts on how to address these:

* [Part 1: Avoiding class name collisions](/blog/2017-04-14-objc-equivalents-to-swift-solutions-part-1-avoiding-class-name-collisions/)
* [Part 2: Avoiding method name collisions](/blog/2017-04-20-objc-equivalents-to-swift-solutions-part-2-avoiding-method-name-collisions/)
* [Part 2: Singletons](/blog/2017-05-26-objc-equivalents-to-swift-solutions-part-3-singletons/)
