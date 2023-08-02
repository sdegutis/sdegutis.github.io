import { DateTime } from "luxon";
import { Karla } from "../../fonts/karla";
import { homePage } from "../../routes/home/home";
import { paintPage } from "../../routes/paint/paint";
import { storyPage } from "../../routes/story/story";
import { staticRouteFor } from "../../util/static";
import { Stylesheet } from "../util/stylesheet";

export const NavBar: JSX.Component<{}> = (attrs, children) => <>
  <Karla.load />
  <Stylesheet src={staticRouteFor(__dir.filesByName['navbar.css']!)} />
  <div id='site-navbar-shadow'></div>
  <nav id='site-navbar'>
    <a href='#' class='site-navbar-togglers'>✕</a>
    <a href={homePage.route}>TSP</a>
    {/* <a href={storyPage.route}>Story</a>
    <a href={paintPage.route}>Paint</a> */}
    <a href="mailto:stevenbradleyconsulting@gmail.com">Contact</a>
  </nav>

  <div id='site-navbar-mobile'>
    <a href={homePage.route}>The Software Philosopher</a>
    <a href='#' class='site-navbar-togglers'>☰</a>
  </div>

  <script defer src={staticRouteFor(__dir.filesByName['navbar.js']!)} />
</>;

export const SiteFooter: JSX.Component<{}> = (attrs, children) => <>
  <Stylesheet src={staticRouteFor(__dir.filesByName['sitefooter.css']!)} />
  <footer id="site-footer">
    <section>
      {/* <nav>
        <a href={homePage.route}>TSP</a>
        <a href="mailto:stevenbradleyconsulting@gmail.com">Contact</a>
      </nav> */}
      <p>Copyright {DateTime.now().year} ©️ All rights reserved</p>
    </section>
  </footer>
</>;
