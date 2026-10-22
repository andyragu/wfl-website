import fs from "fs";
import path from "path";

// Articles written through the /write page are saved here as JSON files.
// Commit and push this folder to publish them.
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type Article = {
    slug: string;
    title: string;
    desc?: string;          // subtitle / description
    author: string;
    date: string;           // display date, e.g. "Dec 14"
    body: string;           // see ArticleBody for the supported formatting
    createdAt: string;      // ISO timestamp, used for ordering
};

export function getArticles(): Article[] {
    if (!fs.existsSync(ARTICLES_DIR)) return [];
    return fs
        .readdirSync(ARTICLES_DIR)
        .filter((f) => f.endsWith(".json"))
        .map((f) => JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), "utf8")) as Article)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function getArticle(slug: string): Article | null {
    if (!/^[a-z0-9-]+$/.test(slug)) return null;
    const file = path.join(ARTICLES_DIR, `${slug}.json`);
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, "utf8")) as Article;
}

export function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "article";
}

export type ArticleInput = Omit<Article, "slug" | "createdAt">;

// True if the slug clashes with a saved article or a hand-written article page.
export function slugTakenLocally(slug: string): boolean {
    return fs.existsSync(path.join(ARTICLES_DIR, `${slug}.json`)) ||
        fs.existsSync(path.join(process.cwd(), "src", "app", "articles", slug));
}

export function newArticle(input: ArticleInput, slug: string): Article {
    return { ...input, slug, createdAt: new Date().toISOString() };
}

export function articleJson(article: Article): string {
    return JSON.stringify(article, null, 2) + "\n";
}

// Saves the article to this computer's content/articles folder (used when running locally).
export function saveArticle(input: ArticleInput): Article {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    const base = slugify(input.title);
    let slug = base;
    for (let i = 2; slugTakenLocally(slug); i++) slug = `${base}-${i}`;
    const article = newArticle(input, slug);
    fs.writeFileSync(path.join(ARTICLES_DIR, `${slug}.json`), articleJson(article));
    return article;
}
