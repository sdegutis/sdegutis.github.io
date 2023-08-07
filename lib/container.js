customElements.define("narrow-container", class NarrowContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <div style='width: 90%; max-width: 600px; margin: 0 auto'>
        <slot></slot>
      </div>
    `;
  }
});

customElements.define("wide-container", class WideContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <div style='max-width: 90%; margin: 0 auto'>
        <slot></slot>
      </div>
    `;
  }
});
