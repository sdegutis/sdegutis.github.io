class ProjectItem extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('project-item-template').content.cloneNode(true);
    template.querySelector('h3').textContent = this.getAttribute('title');
    template.querySelector('.project-kind').textContent = this.getAttribute('type');
    template.querySelector('img').src = '/portfolio/' + this.getAttribute('image');

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template);
  }
}

customElements.define("project-item", ProjectItem);
