import { HeroImage } from "../../components/hero-image";
import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar } from "../../components/navbar/navbar";
import { OfferServices } from "../../components/offer-services-section/offer-services";
import { Head, Html, SiteFooter } from "../../components/page/page";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";

export const contactPage: Routeable = {
  route: '/contact.html',
  handle: () => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: renderElement(<>
        <Html>
          <Head title='About' />
          <body>
            <NavBar />

            <HeroImage image={__dir.filesByName['contact.jpg']!}>
              <h1>About The Software Philosopher</h1>
            </HeroImage>

            <main>

              <section>

                <NarrowContainer>

                  <p><a href="mailto:stevenbradleyconsulting@gmail.com?subject=Consulting">Email</a></p>

                  <h2>Passion becomes Experience</h2>
                  <p>Steven Bradley has <b>over 25 years</b> experience writing the highest quality software, having developed the skills and confidence needed to approach any software problem with a concrete solution.</p>

                  <h2>Where Man meets Machine</h2>
                  <p>In 2008 he created <b>award winning apps</b> for Mac that gained the attention and praise of Macworld magazine for their beauty and asthetic, and were featured by Apple.</p>

                  <h2>On the Shoulders of Giants</h2>
                  <p>After <b>selling his first company</b>, he went on to study under the software gurus in the Chicago area, learning best practices in modern software development, including Test Driven Development, Agile, and Scrum.</p>

                </NarrowContainer>

              </section>

              <OfferServices />

            </main>

            <SiteFooter />
          </body>
        </Html>
      </>),
    };
  }
};

addRouteable(contactPage);
