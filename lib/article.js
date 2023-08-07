import './common.js';
import './markdown.js';
import './article-index.js';

customElements.define("article-header", class ArticleHeader extends HTMLElement {
  connectedCallback() {
    const navbar = document.createElement('site-navbar');
    document.body.insertAdjacentElement('afterbegin', navbar);

    const date = new Date(window.location.pathname.match(/\d{4}-\d{2}-\d{2}/)[0]).toLocaleDateString();
    this.outerHTML = `
      <hero-image src="/imgs/article.jpg">
        <h1>${this.innerHTML}</h1>
        <p>${date}</p>
      </hero-image>
    `;
  }
});

customElements.define("article-body", class ArticleBody extends HTMLElement {
  connectedCallback() {
    const footer = document.createElement('site-footer');
    document.body.insertAdjacentElement('beforeend', footer);

    this.outerHTML = `
      <main>

        <section>
          <narrow-container>
            ${this.innerHTML}
          </narrow-container>
        </section>

        <section>
          <wide-container>
            <all-articles></all-articles>
          </wide-container>
        </section>

      </main>
    `;
  }
});
