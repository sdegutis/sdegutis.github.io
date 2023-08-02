import { HeroImage } from "../../components/hero-image";
import { HighlightJs } from "../../components/highlightjs";
import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar } from "../../components/navbar/navbar";
import { OfferServices } from "../../components/offer-services-section/offer-services";
import { Head, Html, SiteFooter } from "../../components/page/page";
import { Stylesheet } from "../../components/util/stylesheet";
import { renderElement } from "../../core/jsx";
import { Routeable, addRouteable } from "../../core/router";
import { BlogPost } from "../../model/blog/post";
import { blogPosts } from "../../model/load";
import { staticRouteFor } from "../../util/static";
import { AllArticles, blogIndexPage } from "../all-articles/all-articles";

export class ViewBlogPage implements Routeable {

  route: string;

  constructor(private post: BlogPost) {
    this.route = blogIndexPage.route.slice(0, -5) + `/${this.post.slug}.html`;
    addRouteable(this);
  }

  handle(): RouteOutput {
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
