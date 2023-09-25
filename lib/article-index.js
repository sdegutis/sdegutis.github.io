const url = 'https://api.github.com/repos/sdegutis/sdegutis.github.io/contents/articles';

async function getListMaybe() {
  let lastCached = +localStorage.getItem('lastcached');
  if (!lastCached || lastCached + (1000 * 60 * 60) < Date.now()) {
    const res = await fetch(url);
    const raw = await res.text();
    localStorage.setItem('cached', raw);
    localStorage.setItem('lastcached', Date.now());
    return raw;
  }
  else {
    return localStorage.getItem('cached');
  }
}

const articlesReady = getListMaybe().then(JSON.parse).then(async list => {
  const articlesByYear = new Map();

  const articleMetas = list.map(item => {
    const hash = `${item.sha}+${item.size}`;
    const url = `/articles/${item.name}`;
    const date = new Date(item.name.slice(0, 10));
    const year = date.getFullYear();
    const month = date.toLocaleDateString('default', { month: 'long' });
    return { url, year, month, hash };
  });

  const key = articleMetas.map(m => m.hash).join('-');
  const oldKey = localStorage.getItem('key');

  let titles;
  if (oldKey === key) {
    titles = JSON.parse(localStorage.getItem('titles'));
  }
  else {
    titles = await Promise.all(articleMetas.map(async (item, i) => {
      const res = await fetch(list[i].download_url);
      const body = await res.text();
      const match = body.match(/<article-header>([\s\S]+)<\/article-header>/);
      const title = match[1].trim();
      return title;
    }));
    localStorage.setItem('titles', JSON.stringify(titles));
    localStorage.setItem('key', key);
  }

  const articles = articleMetas.map((m, i) => ({ ...m, title: titles[i] }));

  for (const article of [...articles].reverse()) {
    let list = articlesByYear.get(article.year);
    if (!list) articlesByYear.set(article.year, list = []);
    list.push(article);
  }

  return articlesByYear;
});

customElements.define("all-articles", class ArticleIndex extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <h2>Articles</h3>
      Loading...
    `;

    articlesReady.then((articlesByYear) => {
      this.showArticles(articlesByYear);
    });
  }

  showArticles(articlesByYear) {
    this.innerHTML = `
      <h2>Articles</h3>
      <style>
      @media (min-width: 768px) {
        #all-blog-list {
          column-count: 2;
          column-gap: 2em;
        }
      }

      @media (min-width: 1400px) {
        #all-blog-list {
          column-count: 3;
          column-gap: 3em;
        }
      }

      #all-blog-list h3 {
        margin-top: 0;
      }

      .all-blog-year-group {
        margin-bottom: 2em;

        display: grid;
        grid-template-columns: auto 1fr;
        row-gap: 0.25em;
        column-gap: 1em;
      }
      </style>
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
    `;
  }

});
