---
layout: base
title: "The Distant Future of ES Modules in the Browser"
---

### Dream

The dream is this:

1. I write modern JavaScript code that's meant to run in the browser.
2. I don't have to transform it *at all*.
3. To use third-party libraries, I can just `import` them.
4. I can serve third-party libraries I use along-side my own JS files.
5. Using HTTP/2, I can serve all these files efficiently, *without* needing to bundle *any of them.*

This puts us back into a 2012-era development cycle, when making a new
website was as simple as opening up *your favorite text editor* (it
didn't have to be VS Code at the time!), writing some code, and
refreshing your browser.

It also makes our code *simpler*: No more module loaders! No more
dealing with a package manager! No more needing to read the complex
documentation of a bundler! Just write JS code and you're done.

### Libraries

The main problem is that libraries aren't there yet.

Most libraries are distributed on NPM now, but they don't all export
an ES Module interface. A good number of them, even if meant only for
the browser, still use CommonJS or CJS (i.e. "require" and
"module.exports").

Once the majority of front-end-centric libraries use ES Module syntax,
we'll be significantly closer to this dream. Some major ones, like
React, are [moving very
slowly](https://github.com/facebook/react/pull/15885#issuecomment-502186879).

### Tooling

The second problem is that tooling is *still necessary* to some
degree.

For one thing, there's still a need for dependency management. Even if
we were to just download production-ready .js files for our favorite
third-party library like we used to in 2012 (instead of using `npm
install react`), we would still need to install the third party
dependencies that *they* depend on. Otherwise, if they bundle it into
their own .js file, we'll have multiple copies of e.g. the "pad-left"
library, stored within each library that uses it. That's inefficient.

There will also still be a need for serving files locally. Browsers
don't support ES Modules using the file:// protocol, so at least
`python -m SimpleHTTPServer` will be necessary. But given that a lot
of modern JavaScript uses [client-side
routing](https://caniuse.com/#feat=history), a smarter server is
probably needed.

So the future of ES Modules still requires at least a local dev
server, and probably a package manager -- either NPM with sugar on
top, or maybe something new -- that's probably still going to need
something like package.json to store a "dependencies" list.

### Pika

Recently I stumbled on [Pika](https://www.pika.dev/about/), which is
an umbrella project that aims to solve the library problem using
tooling. The author makes a [very compelling
argument](https://www.pika.dev/blog/pika-web-a-future-without-webpack/)
for "a future without webpack", which brought all this to my
attention.

The Pika/CDN solution is interesting, although I'm still not quite
sure how it differs from unpkg.com's `?module` query-string solution.

But I'm focused more on the Pika/web solution, which bundles your
third-party NPM dependencies into ESM-ready self-contained JavaScript
files, using Rollup.

It has a couple issues that need to be solved before I'd be
comfortable replacing create-react-app with this in my client project:
the first is to make it [work with CommonJS
dependencies](https://github.com/pikapkg/web/issues/62), and the
second is to [automatically find
dependencies](https://github.com/pikapkg/web/issues/68).

If those two features are implemented, we'd be able to run Pika in the
background, and it will watch for your imports and install the
third-party JavaScript libraries where your code expects them to be,
without ever needing to transform or bundle your code.

### Revised dream

We'll probably never get back to the simplicity of 2012 web
development, where you can write JavaScript in nano or notepad.exe,
load it in your browser, and watch all the magic happen.

We've discovered much easier ways to write websites since then, and
those ways come at a cost of complexity that make me nervous to throw
the baby out with the bathwater.

That said, there are some great libraries that make it possible to
write web-apps without *transpilers*. If you're okay with abandoning
TypeScript (I'm [on the
fence](/2019-06-20-considering-removing-typescript) about it), then
you can probably replace JSX with
[HTM](https://github.com/developit/htm). And if you can afford to
ditch IE11, you can probably get rid of Babel altogether.
