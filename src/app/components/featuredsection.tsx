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
      title: "WFL Weekly Week 1",
      desc: "Recovering from Sleepy Drew",
      author: "Papa Jack",
      date: "Aug 28",
    },
    {
      id: "2",
      title: "Preseason Rankings and Post Draft Analysis",
      desc: "Who will come out on top post draft?",
      author: "Ale and Jere",
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
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {p.title}
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