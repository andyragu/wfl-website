import { Article, ArticleInput, articleJson, newArticle, slugify, slugTakenLocally } from "./articles";

// Publishing from the live site commits the article file to GitHub,
// which triggers a redeploy of the site with the new article.
const REPO = process.env.GITHUB_REPO ?? "andyragu/wfl-website";
const BRANCH = process.env.GITHUB_BRANCH ?? "master";

export function githubPublishingEnabled(): boolean {
    return Boolean(process.env.GITHUB_TOKEN);
}

export async function publishToGitHub(input: ArticleInput): Promise<Article> {
    const base = slugify(input.title);

    for (let i = 1; i <= 50; i++) {
        const slug = i === 1 ? base : `${base}-${i}`;
        if (slugTakenLocally(slug)) continue;

        const article = newArticle(input, slug);
        const res = await fetch(
            `https://api.github.com/repos/${REPO}/contents/content/articles/${slug}.json`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                    "User-Agent": "wfl-website",
                },
                body: JSON.stringify({
                    message: `Add article: ${article.title}`,
                    content: Buffer.from(articleJson(article)).toString("base64"),
                    branch: BRANCH,
                }),
            }
        );

        // 422 means a file with this slug was already published but isn't deployed yet; try the next slug.
        if (res.status === 422) continue;
        if (!res.ok) {
            console.error("GitHub publish failed", res.status, await res.text());
            throw new Error("GitHub rejected the article. Check the GITHUB_TOKEN setting.");
        }
        return article;
    }

    throw new Error("Could not find a free name for this article. Try a different title.");
}
