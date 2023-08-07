const url = 'https://api.github.com/repos/sdegutis/sdegutis.github.io/contents/articles';

let articlesReady;
const articlesByYear = new Map();

function whenArticlesReady(fn) {
  if (articlesByYear.size > 0) {
    fn();
  }
  else {
    articlesReady = fn;
  }
}

fetch(url).then(res => res.json()).then(async list => {
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

  articlesReady();
});

console.log('defin')

customElements.define("all-articles", class ArticleIndex extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <h2>Articles</h3>
      Loading...
    `;

    whenArticlesReady(() => {
      this.showArticles();
    });
  }

  showArticles() {
    this.innerHTML = `
      <h2>Articles</h3>
      <link rel="stylesheet" href="/style/article-index.css">
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
