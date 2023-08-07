import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/es/highlight.min.js';
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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/vs.min.css">
      <main id='blog-post-page'>
        <section>
          <narrow-container>
            <div id='post-content'>
              ${this.innerHTML}
            </div>
          </narrow-container>
        </section>
      </main>
    `;
    hljs.highlightAll();
  }
});
