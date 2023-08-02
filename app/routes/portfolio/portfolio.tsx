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
import { resumePage } from "../resume/resume";

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
                  <p><a href={resumePage.route}>Resume</a></p>
                  <p><a href='/samanimate/'>Samanimate</a></p>
                  <p><a href='/pico8-games/'>Pico8 Games</a></p>
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

                      <b>Lua4Swift</b>
                      <span>Swift framework for embedding Lua with a native Swift API.</span>

                      <b>choose</b>
                      <span>Command line fuzzy-matching tool for macOS that uses a GUI</span>

                      <b>music</b>
                      <span>Command line music daemon for macOS that only speaks JSON</span>

                      <b>hecto</b>
                      <span>Command line text editor with an embedded Lua plugin system</span>

                      <b>ZephSharp</b>
                      <span>Window manager for Windows using Clojure for scripting</span>

                      <b>management</b>
                      <span>Minimalist EC2 configuration &amp; deployment tool in Ruby.</span>

                      <b>go.assert</b>
                      <span>Assertion helper package for writing tests in Go.</span>

                      <b>go.shattr</b>
                      <span>Go library for printing shell-attributed strings to stdout.</span>

                      <b>OCDSpec2</b>
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

export function PortfolioSection() {
  return <>

    <Stylesheet src={staticRouteFor(__dir.filesByName['portfolio.css']!)} />

    <section class='alt-section'>

      <WideContainer>

        <div id="projects">

          <div class="project" id="project-cleancoders">
            <div class="project-inner">
              <div class="details">
                <h3>CleanCoders.com</h3>
                <span class="project-kind">Website - Online Video Store</span>

                <p class="dec">Written for Robert "Uncle Bob" Martin, using Clojure for the back-end, and
                  JavaScript for the front-end, this site transformed from a
                  simple three-page website to a full
                  enterprise-ready business solution, with nearly 100% test coverage.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-cleancoders.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Clojure</li>
                    <li>Datomic</li>
                    <li>jQuery / D3.js</li>
                    <li>JavaScript</li>
                    <li>ClojureScript</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-docks">
            <div class="project-inner">
              <div class="details">
                <h3>Docks</h3>
                <span class="project-kind">macOS app - Dock Utility</span>

                <p class="dec">Docks was made in 2009 for users who wanted to swap out icons in their Dock with a single
                  click. Its unique functionality and design aesthetic attracted the attention of Apple, Engadget, MacWorld,
                  and led to an acquisition by Big Nerd Ranch.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-docks.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Apple.com Staff Pick</li>
                    <li>MacWorld 4/5 Rating</li>
                    <li>MacWorld Gem of the Year</li>
                    <li>Featured on Engadget.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-leviathan">
            <div class="project-inner">
              <div class="details">
                <h3>Leviathan</h3>
                <span class="project-kind">macOS app - Clojure IDE</span>

                <p class="dec">Written while working on CleanCoders.com, a website written completely in Clojure, this app
                  was designed as a custom IDE for macOS designed specifically for Clojure projects to boost productivity.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-leviathan.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Objective-C</li>
                    <li>Clojure</li>
                    <li>C / C++</li>
                    <li>Cocoa</li>
                    <li>Themeable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-zephyros">
            <div class="project-inner">
              <div class="details">
                <h3>Zephyros</h3>
                <span class="project-kind">macOS app - Hackable Automation</span>

                <p class="dec">This began as an experiment to see how many languages could be used to script a custom
                  macOS window manager using our custom TCP protocol. Eventually it had bindings for Clojure, Ruby,
                  Python, Go, JavaScript, CoffeeScript, Node.js, Chicken Sceme, and Racket, as well as other community
                  additions.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-zephyros.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>TCP / Unix sockets</li>
                    <li>Custom protocol</li>
                    <li>Highly Scriptable</li>
                    <li>10+ language bindings</li>
                    <li>Open source community</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-bubblemaker">
            <div class="project-inner">
              <div class="details">
                <h3>Bubble Maker</h3>
                <span class="project-kind">iOS app - Bubble simulator</span>

                <p class="dec">This toy was made in a weekend to entertain my Steven's 1 year old daughter. It lets you create
                  bubbles with your fingers, which then simulate physics by bumping into each other and falling.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-bubblemaker.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>SpirteKit</li>
                    <li>Custom art</li>
                    <li>Physics simulation</li>
                    <li>iOS</li>
                    <li>tvOS</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-quicklist">
            <div class="project-inner">
              <div class="details">
                <h3>Quick List</h3>
                <span class="project-kind">iOS app - Todo list app</span>

                <p class="dec">A very simple and minimalistic app with one sole focus: to organize and track activities and tasks
                  with a focus on a pleasing aesthetic design and simple UI/UX.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-quicklist.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>In-app purchases</li>
                    <li>Custom UI / UX</li>
                    <li>Social media</li>
                    <li>App Store artwork</li>
                    <li>Spring animations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-oldportfolio">
            <div class="project-inner">
              <div class="details">
                <h3>Old Portfolio</h3>
                <span class="project-kind">Website - Personal Portfolio</span>

                <p class="dec">An old portfolio site written from scratch in about a day. It used best practices for
                  modern responsive web design, and a custom build phase to compile the sources into a single HTML file.
                </p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-oldportfolio.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Node.js</li>
                    <li>Pug / Jade</li>
                    <li>LessCSS</li>
                    <li>HTML5</li>
                    <li>WebSockets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-2048">
            <div class="project-inner">
              <div class="details">
                <h3>2048</h3>
                <span class="project-kind">Java app - Game</span>

                <p class="dec">A desktop remake of the game 2048 (created by Gabriele Cirulli).
                  This version is written in Java 8, using JavaFx for attractive graphics and silky smooth animations.
                </p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-2048.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Java 8</li>
                    <li>JavaFx</li>
                    <li>Modular code</li>
                    <li>Customizable</li>
                    <li>Animations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-mjolnir">
            <div class="project-inner">
              <div class="details">
                <h3>Mjolnir</h3>
                <span class="project-kind">macOS app - Window Manager</span>

                <p class="dec">Created to increase programmer productivity by allowing moving windows around in macOS
                  using keyboard shortcuts. It grew into a community-driven highly extensible app, using Lua for its
                  plugin system.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-mjolnir.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Objective-C</li>
                    <li>Embedded Lua</li>
                    <li>Plugin system</li>
                    <li>Fully documented</li>
                    <li>5,000 GitHub stars</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-affluentconfidante">
            <div class="project-inner">
              <div class="details">
                <h3>AffluentConfidante.com</h3>
                <span class="project-kind">Website - Social Network</span>

                <p class="dec">An elite social network backed by an integration of both Apple Pay and
                  credit card payments (via Stripe.com) seamlessly into the web app, for a frictionless and pain-free
                  payment experience.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-affluentconfidante.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Clojure</li>
                    <li>Elastic Beanstalk</li>
                    <li>PostgreSQL</li>
                    <li>Stripe.com</li>
                    <li>Apple Pay</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-hyperchat">
            <div class="project-inner">
              <div class="details">
                <h3>HyperChat</h3>
                <span class="project-kind">Website - Live Chatroom</span>

                <p class="dec">This isn't just any chatroom. In this web app, you can see what everyone is typing while
                  they type it. Created in order to scratch an itch for making real-time apps and games, this site required
                  learning how to use WebSockets.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-hyperchat.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>JavaScript</li>
                    <li>WebSockets</li>
                    <li>Node.js</li>
                    <li>Vue.js</li>
                    <li>CSS</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-bahamut">
            <div class="project-inner">
              <div class="details">
                <h3>Bahamut</h3>
                <span class="project-kind">macOS app - Music Player</span>

                <p class="dec">As iTunes went through many user interface changes, some desktop users wanted an app that was consistent,
                  intuitive, and easy to use. So Bahamut was born, a minimal music player for macOS written in Cocoa
                  with a completely custom user interface.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-bahamut.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Objective-C</li>
                    <li>Custom UI</li>
                    <li>Cocoa</li>
                    <li>Core Data</li>
                    <li>AVFoundation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-chatter">
            <div class="project-inner">
              <div class="details">
                <h3>Chatter</h3>
                <span class="project-kind">macOS app - Chat (IRC) Client</span>

                <p class="dec">This was written in 2009, before the time of Slack, when IRC was the main way for
                  programmers to get short-term assistance from each other. Its purpose was to be a beautiful app with
                  an emphasis on simplicity and usability over technical power.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-chatter.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Async networking</li>
                    <li>Core Animation</li>
                    <li>Core Text</li>
                    <li>IRC Protocol</li>
                    <li>UI Design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-appgrid">
            <div class="project-inner">
              <div class="details">
                <h3>AppGrid</h3>
                <span class="project-kind">macOS app - Window Manager</span>

                <p class="dec">A productivity tool for power-users that lets you move windows with global
                  keyboard shortcuts. Since it uses Vim-like key bindings, it should feel pretty natural to any
                  programmer. No configuration is needed.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-appgrid.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Minimalist UI</li>
                    <li>Simple UI</li>
                    <li>Vim-like Hotkeys</li>
                    <li>Global Hotkeys</li>
                    <li>Zero-configuration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-hydra">
            <div class="project-inner">
              <div class="details">
                <h3>Hydra</h3>
                <span class="project-kind">macOS app - Lua window manager</span>

                <p class="dec">As an evolution of Phoenix, Hydra was Steven's first attempt at embedding a full Lua virtual
                  machine into an Objective-C app, to make a lightweight and efficient window manager that focused on
                  speed, low memory usage, low CPU usage, and overall being gentle on laptop batteries.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-hydra.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>Embedded Lua</li>
                    <li>Generated docs</li>
                    <li>Lightweight</li>
                    <li>Memory efficient</li>
                    <li>CPU efficient</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="project" id="project-phoenix">
            <div class="project-inner">
              <div class="details">
                <h3>Phoenix</h3>
                <span class="project-kind">macOS app - JavaScript window manager</span>

                <p class="dec">As an evolution of Zephyros, Phoenix was Steven's attempt to use Cocoa's native JavaScript
                  bindings to make a more lightweight and efficient window manager, that focused on speed, low memory
                  usage, low CPU usage, and overall being gentle on laptop batteries.</p>

              </div>
              <div class="split">
                <div class="half">
                  <img src={staticRouteFor(__dir.dirsByName['imgs']!.filesByName["sshot-phoenix.png"]!)} alt="Screenshot" />
                </div>
                <div class="half">
                  <ul>
                    <li>JavaScriptCore</li>
                    <li>JavaScript API</li>
                    <li>Lightweight</li>
                    <li>Memory efficient</li>
                    <li>CPU efficient</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>

      </WideContainer>

    </section>
  </>;
}
