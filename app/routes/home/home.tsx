import { HeroImage } from "../../components/hero-image";
import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar, SiteFooter } from "../../components/navbar/navbar";
import { Head, Html } from "../../components/page/page";
import { Stylesheet } from "../../components/util/stylesheet";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { staticRouteFor } from "../../util/static";

export const homePage: Routeable = {
  route: '/index.html',
  handle: () => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: renderElement(<>
        <Html>

          <Head title="Heavily discounted software expert" />
          <Stylesheet src={staticRouteFor(__dir.filesByName['home.css']!)} />

          <body>

            {/* <NavBar /> */}

            <HeroImage image={__dir.filesByName['home.png']!}>
              <h1>The Software Philosopher</h1>
              <p>From sound principles flow steady results.</p>
            </HeroImage>

            <main>

              <section>
                <NarrowContainer>

                  <p>I'm Steven, a software developer with 15+ years professional experience.</p>
                  <p>My portfolio includes anything from Express/React apps to keyboard firmware in C, scripted IDEs to custom Babel forks.</p>
                  <p>I charge $30/hour. Show me a unique problem and I might be interested in helping you solve it.</p>
                  <p><a href="mailto:stevenbradleyconsulting@gmail.com?subject=Consulting">Let's talk.</a></p>
                </NarrowContainer>
              </section>

            </main>

            <SiteFooter />

          </body>

        </Html>
      </>),
    };
  }
};

addRouteable(homePage);
