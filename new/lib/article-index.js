const url = 'https://api.github.com/repos/sdegutis/sdegutis.github.io/contents/new/articles';

let articlesReady;
const articlesByYear = new Map();

fetch(url).then(res => res.json()).then(async list => {
  const articles = await Promise.all(list
    .filter(item => item.name !== 'index.html')
    .map(async ({ download_url, name }) => {
      const res = await fetch(download_url);
      const body = await res.text();
      const match = body.match(/<article-header>([\s\S]+)<\/article-header>/);
      if (!match) {
        console.log(body)
      }
      const title = match[1].trim();
      const url = `/articles/${name}`;

      const date = new Date(name.slice(0, 10));
      const year = date.getFullYear();
      const month = date.toLocaleDateString('default', { month: 'long' });

      return { url, title, year, month };
    }));

  for (const article of [...articles].reverse()) {
    let list = articlesByYear.get(article.year);
    if (!list) articlesByYear.set(article.year, list = []);
    list.push(article);
  }

  articlesReady();
});

customElements.define("all-articles", class ArticleIndex extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = `Loading...`;

    if (articlesByYear.size > 0) {
      this.showArticles();
    }
    else {
      articlesReady = () => {
        this.showArticles();
      };
    }
  }

  showArticles() {
    this.innerHTML = `
      <link rel='stylesheet' href='/style/all-articles.css'>
      <section>
        <wide-container>
          <div id='all-blog-list'>
            ${[...articlesByYear.entries()].map(([year, articles]) => `
              <h3>${year}</h3>
              <div class='all-blog-year-group'>
                ${articles.map(article => `
                  <span>${article.month}</span>
                  <span><a href=${article.url}>${article.title}</a></span>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </wide-container>
      </section>
    `;
  }

});
