import './container.js';
import './footer.js';
import './head.js';
import './heroimage.js';
import './navbar.js';

document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('h1');
  if (document.title !== title.textContent) {
    document.title += ' - ' + title.textContent;
  }
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
