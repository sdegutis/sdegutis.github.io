import { HeroImage } from "../../components/hero-image";
import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar } from "../../components/navbar/navbar";
import { OfferServices } from "../../components/offer-services-section/offer-services";
import { Head, Html, SiteFooter } from "../../components/page/page";
import { Stylesheet } from "../../components/util/stylesheet";
import { WideContainer } from "../../components/wide-container/wide-container";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { blogPosts } from "../../model/load";
import { whenReady } from "../../ready";
import { staticRouteFor } from "../../util/static";

const postsByYear = new Map<number, any[]>();

whenReady.push(() => {
  for (const post of [...blogPosts].reverse()) {
    let list = postsByYear.get(post.date.year);
    if (!list) postsByYear.set(post.date.year, list = []);
    list.push(post);
  }
});

export const blogIndexPage: Routeable = {
  route: '/articles',
  handle: () => {

    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: renderElement(<>
        <Html>
          <Head title="Technical Articles" />
          <body>

            <NavBar />

            <HeroImage image={__dir.filesByName['all-articles.jpg']!}>
              <h1>Technical Articles</h1>
            </HeroImage>

            <main>

              <section>
                <NarrowContainer>
                  <p>Teaching is the best way to learn, and sharing knowledge with the community is an effective way to advance the software industry's collective knowledge.</p>
                  <p>For 15 years, Steven has written technical articles on various programming languages, frameworks, best practices, and open source projects.</p>
                </NarrowContainer>
              </section>

              <OfferServices />

              <AllArticles />

              <OfferServices />

            </main>

            <SiteFooter />

          </body>
        </Html>
      </>),
    };
  }
};

export const AllArticles = () => <>
  <Stylesheet src={staticRouteFor(__dir.filesByName['all-articles.css']!)} />
  <section>
    <WideContainer>
      <div id='all-blog-list'>
        {[...postsByYear.entries()].map(([year, posts]) => <>
          <h3>{year}</h3>
          <div class='all-blog-year-group'>
            {posts.map(post => <>
              <span>{post.date.monthLong}</span>
              <span><a href={post.view.route}>{post.title}</a></span>
            </>)}
          </div>
        </>)}
      </div>
    </WideContainer>
  </section>
</>;

addRouteable(blogIndexPage);
