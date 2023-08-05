import '/lib/common.js';
import '/lib/heroimage.js';
import '/lib/markdown.js';
import '/lib/container.js';


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
  }

});
