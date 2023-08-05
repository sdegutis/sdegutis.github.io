class SiteNavbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const frag = document.createElement("template");
    frag.innerHTML = `
      <div id='site-navbar-shadow'></div>
      <nav id='site-navbar'>
        <a href='#' class='site-navbar-togglers'>✕</a>
        <a href='/'>TSP</a>
        <a href='/articles.html'>Articles</a>
        <a href='/portfolio.html'>Portfolio</a>
        <a href='https://github.com/sdegutis/'>GitHub</a>
        <a href='sbdegutis@gmail.com'>Email</a>
      </nav>
      <link rel='stylesheet' href='/lib/navbar.css'>
    `;

    this.shadowRoot.append(frag.content);
  }
}

customElements.define("site-navbar", SiteNavbar);
