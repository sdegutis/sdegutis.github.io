customElements.define("narrow-container", class NarrowContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const frag = document.createElement("template");
    frag.innerHTML = `
      <div style='width: 90%; max-width: 600px; margin: 0 auto'>
      </div>
    `;
    frag.content.querySelector('div').append(...this.childNodes);
    this.shadowRoot.append(frag.content);
  }
});
