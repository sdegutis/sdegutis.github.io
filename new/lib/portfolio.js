class Portfolio extends HTMLElement {
  constructor() {
    super();

    // this.attachShadow({ mode: "open" });

    // const str = this.innerHTML;
    // const m = str.match(/^\n*( *)/);
    // const re = new RegExp('^' + m[1], 'gm');
    // const str2 = str.replace(re, '').trim();
    // const final = md.render(str2);

    // const wrapper = document.createElement("div");
    // wrapper.className = 'markdown';
    // wrapper.innerHTML = final;

    // this.shadowRoot.append(wrapper);

    // this.hidden = false;
  }
}

customElements.define("portfolio-list", Portfolio);
