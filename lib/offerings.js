customElements.define("offerings-section", class OfferingsSection extends HTMLElement {
  connectedCallback() {
    this.outerHTML = `
      <section class='alt'>
        <narrow-container>

          <div style='display:flex; gap:1em; align-items:center; margin:1em 0'>

            <img src='/imgs/profile.jpg' alt='Steven Degutis profile' style='border-radius:50%; width:5em; height:5em'>
            <p>
              Steven Degutis is an award winning software developer
              with 15 years of professional experience,
              having shipped products for web, mobile, and desktop.
              <a href='mailto:sbdegutis@gmail.com'>Let's talk</a>
            </p>

          </div>

        </narrow-container>
      </section>
    `;
  }
});
