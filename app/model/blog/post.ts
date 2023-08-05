import JsYaml from 'js-yaml';
import { DateTime } from "luxon";
import { ViewBlogPage } from "../../routes/article/article";
import { markdown } from "../../util/markdown";
import { writeFileSync } from 'fs';
import path from 'path';

export class BlogPost {

  static loadFromFile(file: FsFile) {
    const date = DateTime.fromISO(file.name.slice(0, 10));
    const rawContent = file.buffer.toString('utf8').replace('\r\n', '\n');
    let [, frontmatter, mdContent] = rawContent.split(/^---\r?\n(.+?)\r?\n---\r?\n\r?\n(.+?)$/s) as [string, string, string];
    const { title, draft } = JsYaml.load(frontmatter) as any;
    const content = markdown.render(mdContent);

    mdContent = mdContent.replace(/\r\n/g, '\n')

    // console.log(mdContent.includes('\r\n'))

    const newFilename = file.name.replace('.md', '.html');
    const template = `
<!DOCTYPE html>
<html lang="en">
<script type="module" src="/lib/article.js"></script>

<site-navbar></site-navbar>

<article-header>
  ${title}
</article-header>

<article-body>

${mdContent.replace(/^/gm, '  ')}

</article-body>

<site-footer></site-footer>
`.trim();

    writeFileSync(path.join('new/articles', newFilename), template);

    if (draft) return null;
    return new BlogPost(file.path, file.name.slice(0, -3), title, date, content);
  }

  view;

  constructor(
    public path: string,
    public slug: string,
    public title: string,
    public date: DateTime,
    public content: string,
  ) {
    this.view = new ViewBlogPage(this);
  }

}

export function loadBlogPosts() {
  const postsDir = __dir.dirsByName['posts']!;
  return postsDir.files.map(BlogPost.loadFromFile).filter(isPresent);
}

function isPresent<T>(x: T | null): x is T {
  return !!x;
}
