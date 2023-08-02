---
title: Capturing actual business requirements
draft: true
---

My #1 goal in creating this website was to create it as quickly as I could while spending $0. As a software engineer of 20+ years, this was kind of my bread and butter. So figuring out what to use was a simple process of elimination.

1. **Database**: This site doesn't need any kind of dynamic content, which means it could either be a static site, or a dynamic site that doesn't have a database. That rules out LAMP and MERN and similar stacks as overkill.

2. **Front-end**: It needs to be very very fast, which rules out a JavaScript-heavy front-end, which doesn't exactly rule out React and Vue, but in practice, these would give me no benefit over a very fast backend with decent templating.

3. **Build/deploy**: I wanted to avoid working with CDNs or complicated build/deploy phases as much as humanly possible, and just be able to git push to deploy, but without configuring or paying for a PaaS like Heroku.

4. **View**: I wanted to be able to write JSX exactly how it intuitively feels most natural, but on the backend, yet directly in Node.js and without any separation of view context vs route handler context.

So I cloned a framework that does this, and this is what the view for this page looks like:

```typescript
import { HeroImage } from "../../components/hero-image";
import { HighlightJs } from "../../components/highlightjs";
import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar } from "../../components/navbar/navbar";
import { OfferServices } from "../../components/offer-services-section/offer-services";
import { Head, Html, SiteFooter } from "../../components/page/page";
import { Stylesheet } from "../../components/util/stylesheet";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable, RouteMethod } from "../../core/router";
import { BlogPost } from "../../model/blog/post";
import { blogPosts } from "../../model/load";
import { staticRouteFor } from "../../util/static";
import { AllArticles, blogIndexPage } from "../all-articles/all-articles";

export class ViewBlogPage implements Routeable {

  method: RouteMethod = 'GET';
  route: string;

  constructor(private post: BlogPost) {
    this.route = blogIndexPage.route + `/${this.post.slug}`;
    addRouteable(this);
  }

  handle(input: RouteInput): RouteOutput {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: renderElement(<>
        <Html>
          <Head title={this.post.title}>
            <HighlightJs />
          </Head>
          <body>
            <Stylesheet src={staticRouteFor(__dir.filesByName['article.css']!)} />

            <NavBar />

            <HeroImage image={__dir.filesByName['article.jpg']!}>
              <h1>Technical Article #{blogPosts.indexOf(this.post) + 1}</h1>
              <p>{this.post.date.toLocaleString()}</p>
            </HeroImage>

            <main id='blog-post-page'>
              <section>
                <NarrowContainer>
                  <div id='post-content'>
                    <h2>{this.post.title}</h2>
                    {this.post.content}
                  </div>
                </NarrowContainer>
              </section>
            </main>

            <OfferServices />
            <AllArticles />
            <OfferServices />

            <SiteFooter />
          </body>
        </Html>
      </>),
    };
  }

}
```

There's a few unusual things about this code.

1. **Native JSX**: I'm able to import JSX components on the backend and use them directly in my route handler. `<AllArticles />` near the bottom. These are transformed at runtime into simple objects with this type:

   ```typescript
   type PlainElement = {
     tag: string,
     attrs: Record<string, any>,
     children: any[],
   };
   ```

   You may have guessed this isn't capable in Node.js directly. You're right, I had to build a very small and lightweight runtime on top of it using the `node:vm` module to accomplish this. It also enables hot-reloading very easily, which doubles in functionality for zero-downtime deployments.

2. **__dir is an object**: Since I already had built a new lightweight super-runtime, I upgraded `__dir` and `__file` to be objects so I could do things like `__dir.filesByName['article.css']`. Here's a subset of their API at the time of this writing:

   ```typescript
   declare class FsNode {
       name: string;
       parent: FsDir | null;
   }
   
   export declare class FsDir extends FsNode {
       get root(): FsDir;

       children: (FsFile | FsDir)[];
       get childrenByName(): { [k: string]: FsDir | FsFile };

       get files(): FsFile[];
       get filesByName(): { [k: string]: FsFile };

       get dirs(): FsDir[];
       get dirsByName(): { [k: string]: FsDir };

       find(toPath: string): FsDir | FsFile | null;
   }
   
   export declare class FsFile extends FsNode {
       parent: FsDir;
       buffer: Buffer;

       get root(): FsDir;
   }
   ```

   This is more than sufficient for things like getting a list of all blog post Markdown files in a `posts` directory under the current directory.

3. **addRouteable(...)**: It occurred to me that my site know all its routes ahead of time, just like a static site generator, which it (sort of) evolved from.

   Interestingly, URL routes map perfectly to hash-map keys. So for example `GET /about` can literally be the string key. The source for `addRouteable` is mostly just this:

   ```typescript
   export function addRouteable(routeable: Routeable) {
     addRoute(
       `${routeable.method} ${routeable.route}`,
       (input) => routeable.handle(input)
     );
   }

   function addRoute(route: string, handler: RouteHandler) {
     if (allRoutes.has(route)) {
       console.log(`Duplicate route: ${route}`);
       return;
     }

     allRoutes.set(route, handler);
   }
   ```

   Having all routes known ahead of time also makes things like a sitemap significantly simpler.

3. **staticRouteFor(...)**: Once I had a push-based router, I realized it would be very easy to dynamically create static routes for reused binary-based or text-based content (e.g. images, CSS and JS files, web fonts, etc), combined with the above `__dir` feature resulted in `staticRouteFor(__dir.filesByName['article.css']!)`. This function could even return a data-URL if the data is small enough.

   This is the entire code for this function:

   ```typescript
   import { createHash } from 'crypto';
   import mime from 'mime';
   import path from 'path';
   import { addRouteable, Routeable, RouteMethod } from '../core/router';
   
   export class HashedStaticFile implements Routeable {
   
     etag;
     route;
     constructor(private buffer: Buffer, filename: string) {
       const { name, ext } = path.parse(filename);
       const hash = createHash('sha256').update(buffer).digest().toString('base64url');
       this.route = `/static/${name}.${hash}${ext}`;
       this.etag = `"${hash}"`;
     }
   
     method: RouteMethod = 'GET';
   
     handle(input: RouteInput) {
       const headers = { 'ETag': this.etag, 'Cache-Control': `max-age=${60 * 60 * 24 * 7 * 52}, immutable` };
   
       if (input.headers['if-none-match'] === this.etag) {
         return { status: 304, headers };
       }
   
       return { body: this.buffer, headers };
     }
   
   }
   
   interface Staticable {
     name: string;
     buffer: Buffer;
   }
   
   const map = new Map<Staticable, string>();
   
   export function staticRouteFor(file: Staticable): string {
     let s = map.get(file);
     if (!s) {
       if (file.buffer.length < 1_000) {
         const type = mime.getType(file.name) ?? 'application/octet-stream';
         map.set(file, s = `data:${type};base64,${file.buffer.toString('base64')}`);
       }
       else {
         const f = new HashedStaticFile(file.buffer, file.name);
         addRouteable(f);
         map.set(file, s = f.route);
       }
     }
     return s;
   }
   ```

Putting all this together has resulted in extremely fast development time, and an extremely fast website. I'm confident this site could withstand a HN storm, even though it's just a small Node.js process.

Anyway, I'm available for consulting or for full time employment. [Get in touch via Calendly](/consulting) if you need some work done in Node.js, React, TypeScript, JavaScript, HTML, CSS, or other web technology.
