customElements.define("hero-image", class HeroImage extends HTMLElement {
  constructor() {
    super();

    const children = this.childNodes;

    this.attachShadow({ mode: "open" });

    const frag = document.createElement("template");
    frag.innerHTML = `
      <link rel='stylesheet' href='/lib/heroimage.css'>
      <header class='hero-image' style='background-image: url(${this.getAttribute('src')})'}>
        <div>
          <script>(()=>{const s = document.currentScript; document.addEventListener('DOMContentLoaded', () => s.parentNode.classList.toggle('activate-animation'), 0);})();</script>
          <div id='hero-image-contents'></div>
        </div>
      </header>
    `;

    const placeholder = frag.content.getElementById('hero-image-contents');
    placeholder.append(...children);

    this.shadowRoot.append(frag.content);
  }
});
