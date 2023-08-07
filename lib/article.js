import './common.js';
import './markdown.js';

customElements.define("article-header", class ArticleHeader extends HTMLElement {
  connectedCallback() {
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
    this.outerHTML = `
      <main>

        <section>
          <narrow-container>
            ${this.innerHTML}
          </narrow-container>
        </section>

        <link rel="stylesheet" href="/style/article-index.css">
        <section>
          <wide-container>
            <all-articles></all-articles>
          </wide-container>
        </section>

      </main>
    `;

    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/lib/article-index.js';
    document.head.append(script);
  }
});
