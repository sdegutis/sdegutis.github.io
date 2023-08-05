class SiteNavbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const nav = document.createElement("nav");
    nav.className = 'site-navbar';
    nav.innerHTML = `
      <a href="/index.html">TSP</a>
      <a href="/articles.html">Articles</a>
      <a href="/portfolio.html">Portfolio</a>
      <a href="https://github.com/sdegutis/">GitHub</a>
      <a href="mailto:stevenbradleyconsulting@gmail.com">Email</a>
    `;

    this.shadowRoot.append(nav);

    const style = document.createElement('style');
    style.innerHTML = `
    .site-navbar {
      display: flex;
      gap: 1em;
    }
    `;

    this.shadowRoot.append(style);

    this.hidden = false;
  }
}

customElements.define("site-navbar", SiteNavbar);
