import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/+esm';

const url = 'https://api.github.com/repos/sdegutis/sdegutis.github.io/contents/app/model/blog/posts';
const md = new MarkdownIt();


class Markdown extends HTMLElement {
  constructor() {
    super();

    const str = this.innerHTML;
    const m = str.match(/^\n*( *)/);
    const stripFromStart = m[1];
    const re = new RegExp('^' + m[1], 'gm');
    const str2 = str.replace(re, '').trim();

    const final = md.render(str2);

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.innerHTML = final;

    this.shadowRoot.append(wrapper);

    this.hidden = false;
  }
}

customElements.define("render-markdown", Markdown);
