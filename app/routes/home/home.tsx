import { ActionButton } from "../../components/action-button/action-button";
import { HeroImage } from "../../components/hero-image";
import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar } from "../../components/navbar/navbar";
import { colors, OfferServices } from "../../components/offer-services-section/offer-services";
import { Head, Html, SiteFooter } from "../../components/page/page";
import { Stylesheet } from "../../components/util/stylesheet";
import { WideContainer } from "../../components/wide-container/wide-container";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { staticRouteFor } from "../../util/static";
import { AllArticles, blogIndexPage } from "../all-articles/all-articles";
import { contactPage } from "../contact/contact";
import { portfolioPage, PortfolioSection } from "../portfolio/portfolio";

export const landingPage: Routeable = {
  route: '/index.html',
  handle: () => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: renderElement(<>
        {'<!DOCTYPE html>'}
        <Html>

          <Head />
          <Stylesheet src={staticRouteFor(__dir.filesByName['home.css']!)} />

          <body>

            <NavBar />

            <HeroImage image={__dir.filesByName['home.png']!}>
              <h1>The Software Philosopher</h1>
              <p>From sound principles flow steady results.</p>
            </HeroImage>

            <main>

              <section>
                <NarrowContainer>
                  <p>
                    Steven Bradley is an <b>award winning</b> software developer with <b>15 years</b> of professional experience,
                    having learned from the <b>industry gurus</b> and shipped products for <b>multiple platforms</b>.
                  </p>
                </NarrowContainer>
              </section>

              {/* <section class='alt-section'>

                <div id="services-section">

                  <div class="service" style={colors.red}>
                    <div><span class="dot"></span></div>
                    <header>Consulting</header>
                    <p>Software freelancer skilled in <b>TypeScript</b>, <b>React</b> front-ends, and <b>Node.js</b> back-ends.</p>
                    <div><ActionButton href={contactPage.route}>Get in touch</ActionButton></div>
                  </div>

                  <div class="service" style={colors.green}>
                    <div><span class="dot"></span></div>
                    <header>Mentoring</header>
                    <p>One-on-one <b>Zoom</b> sessions guided by your goals, for <b>focused</b> knowledge sharing.</p>
                    <div><ActionButton href={contactPage.route}>Pick a time</ActionButton></div>
                  </div>

                  <div class="service" style={colors.blue}>
                    <div><span class="dot"></span></div>
                    <header>Webinars</header>
                    <p>Focused <b>group lessons</b> confer high quality knowledge with an <b>economic</b> edge.</p>
                    <div><ActionButton href={contactPage.route}>Sign up</ActionButton></div>
                  </div>

                </div>

              </section> */}

              <PreviewBox page={portfolioPage}>
                <section>
                  <WideContainer>
                    <h1>Portfolio</h1>
                  </WideContainer>
                </section>
                <PortfolioSection />
              </PreviewBox>

              <OfferServices />

              <PreviewBox page={blogIndexPage}>
                <section>
                  <WideContainer>
                    <h1>Technical Articles</h1>
                  </WideContainer>
                </section>
                <AllArticles />
              </PreviewBox>

              <OfferServices />

            </main>

            <SiteFooter />

          </body>

        </Html>
      </>),
    };
  }
};

addRouteable(landingPage);

const previewStyle = `
  position:absolute;
  bottom:0;
  width:100%;
  left:0;
  height:15vh;
  background:linear-gradient(0deg, #fff 0%, #0000 100%);
  display:grid;
  justify-items:center;
  align-items:center;
`;

export const PreviewBox: JSX.Component<{ page: Routeable }> = (attrs, children) => <>
  <div style='max-height:40vh; overflow:hidden; position:relative'>
    {...children}

    <div style={previewStyle}>
      <ActionButton href={attrs.page.route}>
        Read more...
      </ActionButton>
    </div>
  </div>
</>;
