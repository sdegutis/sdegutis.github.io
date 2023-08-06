import { navLinks } from './nav-links.js';

customElements.define("site-footer", class SiteFooter extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const frag = document.createElement("template");
    frag.innerHTML = `
      <link rel='stylesheet' href='/style/footer.css'>
      <footer id="site-footer">
        <section>
          <nav>
            ${navLinks}
          </nav>
          <p>Copyright ${new Date().getFullYear()} ©️ All rights reserved</p>
        </section>
      </footer>
    `;

    this.shadowRoot.append(frag.content);

  }
});
