import "../styles.css"
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/articles";
import ArticleBody from "@/app/components/articlebody";

export function generateStaticParams() {
    return getArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = getArticle(slug);
    if (!article) notFound();

    return (
        <main className = "min-h-screen bg-[#ffffff]">
            <div className="header">
                <h1 className="title-name">{article.title}</h1>
                <div className="post-meta">
                    {article.author} &middot; {article.date}
                </div>
                <div className="divider"></div>
                <div className="article">
                    <ArticleBody body={article.body} />
                </div>
            </div>
        </main>
    )
}
