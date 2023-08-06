customElements.define("narrow-container", class NarrowContainer extends HTMLElement {
  constructor() {
    super();
    this.outerHTML = `
      <div style='width: 90%; max-width: 600px; margin: 0 auto'>
        ${this.innerHTML}
      </div>
    `;
  }
});

customElements.define("wide-container", class WideContainer extends HTMLElement {
  constructor() {
    super();
    this.outerHTML = `
      <div style='max-width: 90%; margin: 0 auto'>
        ${this.innerHTML}
      </div>
    `;
  }
});
