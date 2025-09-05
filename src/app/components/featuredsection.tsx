import Link from "next/link";

type Post = {
    id: string;
    title: string;
    desc?: string;           // subtitle / description
    author?: string;
    date?: string;
};

const POSTS: Post[] = [
    {
      id: "1",
      title: "WFL Weekly 5 - Week 1: A Changing of the Guard",
      desc: "Recovering from Sleepy Drew",
      author: "Papa Jack Media, Ale, Jere",
      date: "Aug 28",
    },
];

export default function FeaturedSection() {
    return (
      <section className="w-full">
        {/* List */}
        <div className="mx-auto mt-8 w-full max-w-3xl">
          {POSTS.map((p, i) => (
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
                  {/* TODO: Make this dynamic so it changes depending on article (RIGHT NOW COMPLETELY MANUAL) */}
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    <Link href="/articles/wfl-weekly-1">{p.title}</Link>
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
      </section>
    );
  }