import { HeroImage } from "../../components/hero-image";
import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar } from "../../components/navbar/navbar";
import { OfferServices } from "../../components/offer-services-section/offer-services";
import { Head, Html, SiteFooter } from "../../components/page/page";
import { Stylesheet } from "../../components/util/stylesheet";
import { WideContainer } from "../../components/wide-container/wide-container";
import { renderElement } from "../../core/jsx";
import { Routeable, addRouteable } from "../../core/router";
import { staticRouteFor } from "../../util/static";
import { resumePage, resumePdfPage } from "../resume/resume";

export const portfolioPage: Routeable = {
  route: '/portfolio.html',
  handle: () => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: renderElement(<>
        <Html>
          <Head title='Portfolio' />
          <body>
            <NavBar />

            <HeroImage image={__dir.filesByName['portfolio.jpg']!}>
              <h1>Portfolio</h1>
            </HeroImage>

            <main>

              <section>
                <NarrowContainer>
                  <p>Real artists ship. If a product isn't finished, it's just an idea. A completed work is the opus of a true craftsman, and evidence of a sound philosophy.</p>
                  <p>Below are some products Steven has created over the past 15 years, showcasing his ability to rapidly build apps for modern web, macOS, and iOS.</p>
                  <p>The skills needed to complete these projects ranged from React to vanilla JavaScript, from TypeScript to Java, from Node.js to Websockets.</p>

                  <p><b>Resume:</b> <a href={resumePage.route}>HTML</a> | <a href={resumePdfPage.route}>PDF</a></p>
                </NarrowContainer>
              </section>

              <OfferServices />

              <PortfolioSection />

              <section>

                <NarrowContainer>

                  <div>
                    <h2>Smaller projects</h2>
                    <p>These may be tiny, but they're interesting technical feats.</p>
                    <div style='display:grid; grid-template-columns: auto 1fr; margin-top: 1em; gap: 0.25em 1em'>

                      <b><a href='https://github.com/sdegutis/samanimate'>Samanimate</a></b>
                      <span>Pure TypeScript/DOM paint-like animator app best with stylus.</span>

                      <b><a href='/pico8-games/'>Pico8 Games</a></b>
                      <span>Many little games I've made for and with my kids.</span>

                      <b><a href='https://github.com/sdegutis/lp8'>lp8</a></b>
                      <span>Use Pico8 graphics and maps in Love2d.</span>

                      <b><a href="https://github.com/weyhan/lua4swift">Lua4Swift</a></b>
                      <span>Swift framework for embedding Lua with a native Swift API.</span>

                      <b><a href="https://github.com/chipsenkbeil/choose">choose</a></b>
                      <span>Command line fuzzy-matching tool for macOS that uses a GUI</span>

                      <b><a href="https://github.com/Hugoprogpro/ZephSharp">ZephSharp</a></b>
                      <span>Window manager for Windows using Clojure for scripting</span>

                      <b><a href="https://github.com/pkrnjevic/go.shattr">go.shattr</a></b>
                      <span>Go library for printing shell-attributed strings to stdout.</span>

                      <b><a href="https://github.com/OCDSpec/OCDSpec2">OCDSpec2</a></b>
                      <span>Objective-C based testing framework with Xcode integration.</span>

                    </div>
                  </div>

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

addRouteable(portfolioPage);

const projects = [
  {
    title: "CleanCoders.com",
    type: "Website - Online Video Store",
    desc: `Written for Robert "Uncle Bob" Martin, using Clojure for the back-end, and
           JavaScript for the front-end, this site transformed from a
           simple three-page website to a full
           enterprise-ready business solution, with nearly 100% test coverage.`,
    image: "sshot-cleancoders.png",
    features: [
      "Clojure",
      "Datomic",
      "jQuery / D3.js",
      "JavaScript",
      "ClojureScript",
    ],
  },
  {
    title: "Docks",
    type: "macOS app - Dock Utility",
    desc: `Docks was made in 2009 for users who wanted to swap out icons in their Dock with a single
           click. Its unique functionality and design aesthetic attracted the attention of Apple, Engadget, MacWorld,
           and led to an acquisition by Big Nerd Ranch.`,
    image: "sshot-docks.png",
    features: [
      "Apple.com Staff Pick",
      "MacWorld 4/5 Rating",
      "MacWorld Gem of the Year",
      "Featured on Engadget.com",
    ],
  },
  {
    title: "Leviathan",
    type: "macOS app - Clojure IDE",
    desc: `Written while working on CleanCoders.com, a website written completely in Clojure, this app
           was designed as a custom IDE for macOS designed specifically for Clojure projects to boost productivity.`,
    image: "sshot-leviathan.png",
    features: [
      "Objective-C",
      "Clojure",
      "C / C++",
      "Cocoa",
      "Themeable",
    ],
  },
  {
    title: "Zephyros",
    type: "macOS app - Hackable Automation",
    desc: `This began as an experiment to see how many languages could be used to script a custom
           macOS window manager using our custom TCP protocol. Eventually it had bindings for Clojure, Ruby,
           Python, Go, JavaScript, CoffeeScript, Node.js, Chicken Sceme, and Racket, as well as other community
           additions.`,
    image: "sshot-zephyros.png",
    features: [
      "TCP / Unix sockets",
      "Custom protocol",
      "Highly Scriptable",
      "10+ language bindings",
      "Open source community",
    ],
  },
  {
    title: "Bubble Maker",
    type: "iOS app - Bubble simulator",
    desc: `This toy was made in a weekend to entertain my Steven's 1 year old daughter. It lets you create
           bubbles with your fingers, which then simulate physics by bumping into each other and falling.`,
    image: "sshot-bubblemaker.png",
    features: [
      "SpirteKit",
      "Custom art",
      "Physics simulation",
      "iOS",
      "tvOS",
    ],
  },
  {
    title: "Quick List",
    type: "iOS app - Todo list app",
    desc: `A very simple and minimalistic app with one sole focus: to organize and track activities and
           tasks with a focus on a pleasing aesthetic design and simple UI/UX.`,
    image: "sshot-quicklist.png",
    features: [
      "In-app purchases",
      "Custom UI / UX",
      "Social media",
      "App Store artwork",
      "Spring animations",
    ],
  },
  {
    title: "Old Portfolio",
    type: "Website - Personal Portfolio",
    desc: `An old portfolio site written from scratch in about a day. It used best practices for
           modern responsive web design, and a custom build phase to compile the sources into a single HTML file.`,
    image: "sshot-oldportfolio.png",
    features: [
      "Node.js",
      "Pug / Jade",
      "LessCSS",
      "HTML5",
      "WebSockets",
    ],
  },
  {
    title: "2048",
    type: "Java app - Game",
    desc: `A desktop remake of the game 2048 (created by Gabriele Cirulli).
           This version is written in Java 8, using JavaFx for attractive graphics and silky smooth animations.`,
    image: "sshot-2048.png",
    features: [
      "Java 8",
      "JavaFx",
      "Modular code",
      "Customizable",
      "Animations",
    ],
  },
  {
    title: "Mjolnir",
    type: "macOS app - Window Manager",
    desc: `Created to increase programmer productivity by allowing moving windows around in macOS
           using keyboard shortcuts. It grew into a community-driven highly extensible app, using Lua for its
           plugin system.`,
    image: "sshot-mjolnir.png",
    features: [
      "Objective-C",
      "Embedded Lua",
      "Plugin system",
      "Fully documented",
      "5,000 GitHub stars",
    ],
  },
  {
    title: "AffluentConfidante.com",
    type: "Website - Social Network",
    desc: `An elite social network backed by an integration of both Apple Pay and
           credit card payments (via Stripe.com) seamlessly into the web app, for a frictionless and pain-free
           payment experience.`,
    image: "sshot-affluentconfidante.png",

    features: [
      "Clojure",
      "Elastic Beanstalk",
      "PostgreSQL",
      "Stripe.com",
      "Apple Pay",
    ],
  },
  {
    title: "HyperChat",
    type: "Website - Live Chatroom",
    desc: `This isn't just any chatroom. In this web app, you can see what everyone is typing while
           they type it. Created in order to scratch an itch for making real-time apps and games, this site required
           learning how to use WebSockets.`,
    image: "sshot-hyperchat.png",
    features: [
      "JavaScript",
      "WebSockets",
      "Node.js",
      "Vue.js",
      "CSS",
    ],
  },
  {
    title: "Bahamut",
    type: "macOS app - Music Player",
    desc: `As iTunes went through many user interface changes, some desktop users wanted an app that was
           consistent, intuitive, and easy to use. So Bahamut was born, a minimal music player for macOS written in Cocoa
           with a completely custom user interface.`,
    image: "sshot-bahamut.png",
    features: [
      "Objective-C",
      "Custom UI",
      "Cocoa",
      "Core Data",
      "AVFoundation",
    ],
  },
  {
    title: "Chatter",
    type: "macOS app - Chat (IRC) Client",
    desc: `This was written in 2009, before the time of Slack, when IRC was the main way for
           programmers to get short-term assistance from each other. Its purpose was to be a beautiful app with
           an emphasis on simplicity and usability over technical power.`,
    image: "sshot-chatter.png",
    features: [
      "Async networking",
      "Core Animation",
      "Core Text",
      "IRC Protocol",
      "UI Design",
    ],
  },
  {
    title: "AppGrid",
    type: "macOS app - Window Manager",
    desc: `A productivity tool for power-users that lets you move windows with global
           keyboard shortcuts. Since it uses Vim-like key bindings, it should feel pretty natural to any
           programmer. No configuration is needed.`,
    image: "sshot-appgrid.png",
    features: [
      "Minimalist UI",
      "Simple UI",
      "Vim-like Hotkeys",
      "Global Hotkeys",
      "Zero-configuration",
    ],
  },
  {
    title: "Hydra",
    type: "macOS app - Lua window manager",
    desc: `As an evolution of Phoenix, Hydra was Steven's first attempt at embedding a full Lua virtual
           machine into an Objective-C app, to make a lightweight and efficient window manager that focused on
           speed, low memory usage, low CPU usage, and overall being gentle on laptop batteries.`,
    image: "sshot-hydra.png",
    features: [
      "Embedded Lua",
      "Generated docs",
      "Lightweight",
      "Memory efficient",
      "CPU efficient",
    ],
  },
  {
    title: "Phoenix",
    type: "macOS app - JavaScript window manager",
    desc: `As an evolution of Zephyros, Phoenix was Steven's attempt to use Cocoa's native JavaScript
           bindings to make a more lightweight and efficient window manager, that focused on speed, low memory
           usage, low CPU usage, and overall being gentle on laptop batteries.`,
    image: "sshot-phoenix.png",
    features: [
      "JavaScriptCore",
      "JavaScript API",
      "Lightweight",
      "Memory efficient",
      "CPU efficient",
    ],
  },
];

export function PortfolioSection() {
  return <>

    <Stylesheet src={staticRouteFor(__dir.filesByName['portfolio.css']!)} />

    <section class='alt-section'>

      <WideContainer>

        <div id="projects">

          {projects.map(p => <>
            <div class="project">
              <div class="project-inner">
                <div class="details">
                  <h3>{p.title}</h3>
                  <span class="project-kind">{p.type}</span>

                  <p class="dec">{p.desc}</p>

                </div>
                <div class="split">
                  <div class="half">
                    <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName[p.image]!)} alt="Screenshot" />
                  </div>
                  <div class="half">
                    <ul>
                      {p.features.map(f => <>
                        <li>{f}</li>
                      </>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </>)}

        </div>

      </WideContainer>

    </section>
  </>;
}
