import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/+esm';

const url = 'https://api.github.com/repos/sdegutis/sdegutis.github.io/contents/app/model/blog/posts';


const md = new MarkdownIt();

console.log('hey', md.render('hello *world*'))

// class WordCount extends HTMLParagraphElement {
//   constructor() {
//     // Always call super first in constructor
//     super();

//     // Element functionality written in here
//   }
// }

// customElements.define("word-count", WordCount, { extends: "p" });
