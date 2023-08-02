import JsYaml from 'js-yaml';
import { DateTime } from "luxon";
import { ViewBlogPage } from "../../routes/article/article";
import { markdown } from "../../util/markdown";

export class BlogPost {

  static loadFromFile(file: FsFile) {
    const date = DateTime.fromISO(file.name.slice(0, 10));
    const rawContent = file.buffer.toString('utf8').replace('\r\n', '\n');
    const [, frontmatter, mdContent] = rawContent.split(/^---\r?\n(.+?)\r?\n---\r?\n\r?\n(.+?)$/s) as [string, string, string];
    const { title, draft } = JsYaml.load(frontmatter) as any;
    const content = markdown.render(mdContent);
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
