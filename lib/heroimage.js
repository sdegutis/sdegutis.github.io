customElements.define("hero-image", class HeroImage extends HTMLElement {
  connectedCallback() {
    const home = this.hasAttribute('home') ? 'home' : '';
    this.attachShadow({ mode: "open" }).innerHTML = `
      <link rel='stylesheet' href='/style/heroimage.css'>
      <header class='hero-image ${home}' style='background-image: url(${this.getAttribute('src')})'}>
        <div>
          <slot></slot>
        </div>
      </header>
    `;

    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const toAnimate = this.shadowRoot.querySelector('.hero-image > div');
        toAnimate.classList.toggle('activate-animation');
      }, 0);
    });
  }
});
