"use client";
import "../articles/styles.css"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ArticleBody from "../components/articlebody";

const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:border-[#CC0000]";

export default function WritePage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [author, setAuthor] = useState("Papa Jack Media");
    const [date, setDate] = useState(
        new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );
    const [body, setBody] = useState("");
    const [password, setPassword] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Set once the article is sent to GitHub and waiting for the site to redeploy.
    const [publishedHref, setPublishedHref] = useState<string | null>(null);

    async function publish(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            const res = await fetch("/api/articles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, desc, author, date, body, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Could not save the article.");
            if (data.pending) {
                setPublishedHref(data.href);
                return;
            }
            router.push(data.href);
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not save the article.");
            setSaving(false);
        }
    }

    if (publishedHref) {
        return (
            <main className="min-h-screen bg-[#ffffff]">
                <div className="header">
                    <h1 className="title-name">Published!</h1>
                    <div className="post-meta">
                        &ldquo;{title}&rdquo; will be live in about a minute, once the site finishes updating.
                    </div>
                    <div className="divider"></div>
                    <div className="flex justify-center gap-4 font-bold text-[#CC0000] [&_a:hover]:underline">
                        <Link href={publishedHref}>View article</Link>
                        <Link href="/">Home</Link>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#ffffff]">
            <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
                {/* Editor */}
                <form onSubmit={publish} className="lg:w-1/2 p-6 lg:border-r border-gray-200 text-black">
                    <h1 className="text-xl font-bold text-[#CC0000] mb-4">Write an Article</h1>

                    <label className="block text-sm font-bold mb-1">Title</label>
                    <input className={`${inputClass} mb-4`} value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder="WFL Weekly 5 - Week 16: ..." required />

                    <label className="block text-sm font-bold mb-1">Subtitle (shown on the Featured list)</label>
                    <input className={`${inputClass} mb-4`} value={desc} onChange={(e) => setDesc(e.target.value)} />

                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-bold mb-1">Author</label>
                            <input className={inputClass} value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </div>
                        <div className="w-32">
                            <label className="block text-sm font-bold mb-1">Date</label>
                            <input className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>

                    <label className="block text-sm font-bold mb-1">Article</label>
                    <p className="text-xs text-gray-600 mb-1">
                        <code>## Heading</code> for section titles, <code>1. Item</code> or <code>- Item</code> for lists,
                        {" "}<code>**bold**</code>, <code>*italic*</code>. Leave a blank line between paragraphs.
                    </p>
                    <textarea className={`${inputClass} h-96 font-mono text-sm`} value={body}
                        onChange={(e) => setBody(e.target.value)} required />

                    <label className="block text-sm font-bold mt-4 mb-1">Writer password</label>
                    <input type="password" className={`${inputClass} max-w-xs`} value={password}
                        onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

                    {error && <p className="mt-3 text-sm text-[#CC0000]">{error}</p>}

                    <button type="submit" disabled={saving}
                        className="mt-4 px-4 py-2 rounded bg-[#CC0000] text-white font-bold hover:underline disabled:opacity-50 disabled:no-underline">
                        {saving ? "Publishing..." : "Publish to Featured"}
                    </button>
                </form>

                {/* Live preview, using the same styles as published articles */}
                <div className="lg:w-1/2 py-6">
                    <div className="text-center text-sm font-bold text-[#CC0000] mb-2">Preview</div>
                    <div className="header">
                        <h1 className="title-name">{title || "Untitled"}</h1>
                        <div className="post-meta">
                            {author} &middot; {date}
                        </div>
                        <div className="divider"></div>
                        <div className="article">
                            <ArticleBody body={body} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
