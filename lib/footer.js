import { navLinks } from './nav-links.js';

customElements.define("site-footer", class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = /*html*/`

      <style>
        footer {
          margin-top: 2em;
        }

        footer section {
          display: grid;
          gap: 0.5em;
          justify-items: center;
        }

        footer nav {
          display: flex;
          gap: 1em;
          flex-wrap: wrap;
          justify-content: center;
          font-family: 'Karla', sans-serif;
        }

        footer nav a {
          color: inherit;
        }

        footer p {
          opacity: 0.4;
          font-size: 80%;
        }
      </style>

      <footer id="site-footer">
        <section>
          <nav>
            ${navLinks}
          </nav>
          <p>Copyright ${new Date().getFullYear()} ©️ All rights reserved</p>
        </section>
      </footer>

    `;
  }
});
