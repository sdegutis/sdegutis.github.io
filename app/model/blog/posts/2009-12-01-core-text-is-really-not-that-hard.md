---
title: "Core Text is really not that hard."
---

Seriously. Check out the [API Reference](http://developer.apple.com/mac/library/documentation/Carbon/Reference/CoreText%5FFramework%5FRef/index.html#//apple%5Fref/doc/uid/TP40005304). It's pretty minimal. But here's a shortcut through the guides:

The "classes" (for lack of a better term) are simply hierarchical; each class is just a fancy collection of the next class. Specifically, CTFramesetters can create CTFrames based on certain criteria, which in turn contain CTLines which are composed of CTRuns. Then there's the CTFont stuff and some glyph and paragraph-style utilities, both are self-explanatory and have Cocoa counterparts with which you're already familiar.

So, if you need to create a special text control (or label of sorts) and NSTextView is way too much for your needs, I definitely recommend using Core Text because it's just so clean and simple, very Cocoa-like (actually, more-so than Cocoa, if that's possible!).

(Oh yeah, and did I mention you can layout your text along arbitrary CGPaths? WIN.)