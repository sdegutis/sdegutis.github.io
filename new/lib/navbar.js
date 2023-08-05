import { navLinks } from './nav-links.js';

customElements.define("site-navbar", class SiteNavbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const frag = document.createElement("template");
    frag.innerHTML = `
      <div id='site-navbar-shadow'></div>
      <nav id='site-navbar'>
        <a href='#' class='site-navbar-togglers'>✕</a>
        ${navLinks}
      </nav>
      <link rel='stylesheet' href='/lib/navbar.css'>
      <div id='site-navbar-mobile'>
        <a href='/'>The Software Philosopher</a>
        <a href='#' class='site-navbar-togglers'>☰</a>
      </div>
    `;

    const shadow = frag.content.getElementById('site-navbar-shadow');
    const navbar = frag.content.getElementById('site-navbar');
    const togglers = frag.content.querySelectorAll('.site-navbar-togglers');

    for (const button of togglers) {
      button.onclick = (e) => {
        e.preventDefault();
        toggleMenu();
      };
    }

    shadow.onclick = () => {
      toggleMenu();
    };

    function toggleMenu() {
      navbar.classList.toggle('open');
      shadow.classList.toggle('open');
    }

    this.shadowRoot.append(frag.content);

  }
});
