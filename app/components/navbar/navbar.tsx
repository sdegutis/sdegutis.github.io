import { Karla } from "../../fonts/karla";
import { email } from "../../routes/contact/contact";
import { blogIndexPage } from "../../routes/all-articles/all-articles";
import { landingPage } from "../../routes/home/home";
import { portfolioPage } from "../../routes/portfolio/portfolio";
import { staticRouteFor } from "../../util/static";
import { Stylesheet } from "../util/stylesheet";

export const NavBar: JSX.Component<{}> = (attrs, children) => <>
  <Karla.load />
  <Stylesheet src={staticRouteFor(__dir.filesByName['navbar.css']!)} />
  <div id='site-navbar-shadow'></div>
  <nav id='site-navbar'>
    <a href='#' class='site-navbar-togglers'>✕</a>
    <a href={landingPage.route}>TSP</a>
    <a href={blogIndexPage.route}>Articles</a>
    <a href={portfolioPage.route}>Portfolio</a>
    <a href="https://github.com/sdegutis/">GitHub</a>
    <a href={email.address}>Email</a>
  </nav>
  {/* <svg viewBox="0 0 10 10">
    <path d="M2,2 L8,2 M2,5 L8,5 M2,8 L8,8" />
  </svg> */}

  <div id='site-navbar-mobile'>
    <a href={landingPage.route}>The Software Philosopher</a>
    <a href='#' class='site-navbar-togglers'>☰</a>
  </div>

  <script defer src={staticRouteFor(__dir.filesByName['navbar.js']!)} />
</>;
