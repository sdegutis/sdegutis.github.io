customElements.define("offerings-section", class OfferingsSection extends HTMLElement {
  connectedCallback() {
    this.outerHTML = `
      <section class='alt'>
        <narrow-container>

          <div style='display: flex; gap: 1em; margin: 1em 0'>

            <img src='/imgs/profile.jpg' alt='Steven Degutis profile' style='border-radius: 50%; width: 5em'>
            <p>
              Steven Degutis is a software contractor
              with 15 years professional experience
              in Web, Desktop, and Mobile development.
              <a href='mailto:sbdegutis@gmail.com'>Let's talk</a>
            </p>

          </div>

        </narrow-container>
      </section>
    `;
  }
});
