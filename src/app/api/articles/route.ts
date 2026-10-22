import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { saveArticle } from "@/lib/articles";
import { githubPublishingEnabled, publishToGitHub } from "@/lib/github";

function passwordOk(given: string): boolean {
    const expected = process.env.WRITER_PASSWORD;
    // Running locally without a password set: anyone at this computer can write.
    if (!expected) return process.env.NODE_ENV !== "production";
    const hash = (s: string) => createHash("sha256").update(s).digest();
    return timingSafeEqual(hash(given), hash(expected));
}

export async function POST(req: Request) {
    const data = await req.json().catch(() => null);

    if (!passwordOk(String(data?.password ?? ""))) {
        return NextResponse.json({ error: "Wrong writer password." }, { status: 401 });
    }

    const title = String(data?.title ?? "").trim();
    const body = String(data?.body ?? "").trim();
    if (!title || !body) {
        return NextResponse.json({ error: "Title and article text are required." }, { status: 400 });
    }

    const input = {
        title,
        body,
        desc: String(data?.desc ?? "").trim() || undefined,
        author: String(data?.author ?? "").trim() || "Papa Jack Media",
        date: String(data?.date ?? "").trim() ||
            new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };

    // On the live site, commit the article to GitHub; it goes live after the redeploy.
    if (githubPublishingEnabled()) {
        try {
            const article = await publishToGitHub(input);
            return NextResponse.json({ href: `/articles/${article.slug}`, pending: true });
        } catch (err) {
            return NextResponse.json(
                { error: err instanceof Error ? err.message : "Could not publish the article." },
                { status: 502 }
            );
        }
    }

    // The live site can't save files, so without GitHub set up there is nowhere to put the article.
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "Publishing isn't set up yet (missing GITHUB_TOKEN setting)." },
            { status: 500 }
        );
    }

    const article = saveArticle(input);
    return NextResponse.json({ href: `/articles/${article.slug}`, pending: false });
}
