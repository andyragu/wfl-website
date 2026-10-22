"use client";
import Link from "next/link";
import { useState } from "react";

export type Post = {
    id: string;
    title: string;
    desc?: string;           // subtitle / description
    author?: string;
    date?: string;
    href: string;
};

const PAGE_SIZE = 4;

export default function FeaturedList({ posts }: { posts: Post[] }) {
    const [page, setPage] = useState(0);
    const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    const visible = posts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    return (
      <section className="w-full">
        {/* List */}
        <div className="mx-auto mt-8 w-full max-w-3xl">
          {visible.map((p, i) => (
            <article key={p.id} className={i > 0 ? "border-t border-gray-200 pt-8 mt-8" : ""}>
              <div className="grid grid-cols-[1fr,140px] gap-6 items-start">
                {/* Left: text */}
                <div>
                  {/* author row (optional) */}
                  {p.author && (
                    <div className="mb-2 text-sm text-gray-600">
                      {p.author}
                    </div>
                  )}

                  {/* title */}
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    <Link href={p.href}>{p.title}</Link>
                  </h3>

                  {/* desc */}
                  {p.desc && (
                    <p className="mt-2 text-gray-600">
                      {p.desc}
                    </p>
                  )}
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mx-auto mt-8 w-full max-w-3xl flex justify-between items-center gap-4 border-t border-gray-200 pt-4 font-bold text-[#A23131]">
            <button onClick={() => setPage(page - 1)} disabled={page === 0}
              className="whitespace-nowrap disabled:invisible">
              &larr; Newer
            </button>
            <span className="whitespace-nowrap text-sm text-gray-600 font-normal">
              Page {page + 1} of {pageCount}
            </span>
            <button onClick={() => setPage(page + 1)} disabled={page === pageCount - 1}
              className="whitespace-nowrap disabled:invisible">
              Older &rarr;
            </button>
          </div>
        )}
      </section>
    );
  }
