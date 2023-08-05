import './footer.js';
import './head.js';
import './navbar.js';

document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('h1');
  document.title += ' - ' + title.textContent;
});
