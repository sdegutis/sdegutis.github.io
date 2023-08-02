for (const button of document.querySelectorAll('.site-navbar-togglers')) {
  button.onclick = (e) => {
    e.preventDefault();
    toggleMenu();
  };
}

document.getElementById('site-navbar-shadow').onclick = () => {
  toggleMenu();
};

function toggleMenu() {
  document.getElementById('site-navbar').classList.toggle('open');
  document.getElementById('site-navbar-shadow').classList.toggle('open');
}
