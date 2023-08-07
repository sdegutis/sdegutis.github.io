customElements.define("hero-image", class HeroImage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const home = this.hasAttribute('home') ? 'home' : '';

    const frag = document.createElement("template");
    frag.innerHTML = `
      <link rel='stylesheet' href='/style/heroimage.css'>
      <header class='hero-image ${home}' style='background-image: url(${this.getAttribute('src')})'}>
        <div>
          <slot></slot>
        </div>
      </header>
    `;

    const toAnimate = frag.content.querySelector('.hero-image > div');

    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        toAnimate.classList.toggle('activate-animation');
      }, 0);
    });

    this.shadowRoot.append(frag.content);
  }
});
