import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/es/highlight.min.js';
import '/lib/common.js';
import '/lib/container.js';
import '/lib/heroimage.js';
import '/lib/markdown.js';


customElements.define("article-header", class ArticleHeader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const date = new Date(window.location.pathname.match(/\d{4}-\d{2}-\d{2}/)[0]).toLocaleDateString();

    const frag = document.createElement("template");
    frag.innerHTML = `
      <hero-image src="/imgs/article.jpg">
        <h1></h1>
        <p>${date}</p>
      </hero-image>
    `;

    frag.content.querySelector('h1').append(...this.childNodes);

    this.shadowRoot.append(frag.content);

  }
});


customElements.define("article-body", class ArticleBody extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/vs.min.css">
      <main id='blog-post-page'>
        <section>
          <narrow-container>
            <div id='post-content'>
              <render-markdown>${this.innerHTML}</render-markdown>
            </div>
          </narrow-container>
        </section>
      </main>
    `;

    hljs.highlightAll();
  }

});
