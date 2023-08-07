import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/+esm';
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/es/highlight.min.js';

const md = new MarkdownIt();

customElements.define("render-markdown", class Markdown extends HTMLElement {
  constructor() {
    super();

    const str = this.innerHTML;
    const m = str.match(/^\n*( *)/);
    const re = new RegExp('^' + m[1], 'gm');
    const str2 = str.replace(re, '').trim();
    const final = md.render(str2);

    this.outerHTML = final;
    hljs.highlightAll();
  }
});
