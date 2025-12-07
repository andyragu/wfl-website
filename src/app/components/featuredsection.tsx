import Link from "next/link";

type Post = {
    id: string;
    title: string;
    desc?: string;           // subtitle / description
    author?: string;
    date?: string;
    href: string;
};

const POSTS: Post[] = [
    {
      id: "1",
      title: "WFL Weekly 5 - Week 1: A Changing of the Guard",
      desc: "Recovering from Sleepy Drew",
      author: "Papa Jack Media, Ale, Jere",
      date: "Aug 28",
      href: "/articles/wfl-weekly-1",
    },
    {
      id: "2",
      title: "WFL Weekly 5 - Week 2: Highs & Lows",
      desc: "Life is all about the ups and downs",
      author: "Papa Jack Media",
      date: "Sep 12",
      href: "/articles/wfl-weekly-2",
    },
    {
      id: "3",
      title: "WFL Weekly 5 - Week 3: Honeymoons & Heartaches",
      desc: "Point out your partner's imperfections",
      author: "Papa Jack Media",
      date: "Sep 19",
      href: "/articles/wfl-weekly-3",
    },
    {
      id: "4",
      title: "WFL Weekly 5 - Week 4: Trading to Trade",
      desc: "It's a give and take",
      author: "Papa Jack Media",
      date: "Sep 28",
      href: "/articles/wfl-weekly-4",
    },
    {
      id: "5",
      title: "WFL Weekly 5 - Week 5: The Bugs",
      desc: "The HIV Epidemic",
      author: "Papa Jack Media",
      date: "Oct 5",
      href: "/articles/wfl-weekly-5",
    },
    {
      id: "6",
      title: "WFL Weekly 5 - Week 6: ScheduleGate",
      desc: "The Man with No Name",
      author: "Papa Jack Media",
      date: "Oct 11",
      href: "/articles/wfl-weekly-6",
    },
    {
      id: "7",
      title: "WFL Weekly 5 - Week 7: Beer",
      desc: "Beer.",
      author: "Papa Jack Media",
      date: "Oct 11",
      href: "/articles/wfl-weekly-7",
    },
    {
      id: "8",
      title: "WFL Weekly 5 - Week 8: The Dog Days",
      desc: "Tua has eater eyes.",
      author: "Papa Jack Media",
      date: "Oct 26",
      href: "/articles/wfl-weekly-8",
    },
    {
      id: "9",
      title: "WFL Weekly 5 - Week 9: The Sunday (& Monday) Scaries",
      desc: "Fantasy Horror Stories",
      author: "Papa Jack Media",
      date: "Nov 2",
      href: "/articles/wfl-weekly-9",
    },
    {
      id: "10",
      title: "WFL Weekly 5 - Week 10: Bye Week",
      desc: "Stop watching football",
      author: "Papa Jack Media",
      date: "Nov 9",
      href: "/articles/wfl-weekly-10",
    },
    {
      id: "11",
      title: "WFL Weekly 5 - Week 11: Burnout",
      desc: "We're Tired",
      author: "Papa Jack Media",
      date: "Nov 16",
      href: "/articles/wfl-weekly-11",
    },
     {
      id: "12",
      title: "WFL Weekly 5 - Week 12: The Deadline",
      desc: "Where dreams get flushed away",
      author: "Papa Jack Media",
      date: "Nov 23",
      href: "/articles/wfl-weekly-12",
    },
    {
      id: "13",
      title: "WFL Weekly 5 - Week 13: Giving Thanks!",
      desc: "Gobble Gobble",
      author: "Papa Jack Media",
      date: "Nov 30",
      href: "/articles/wfl-weekly-13",
    },
    {
      id: "14",
      title: "WFL Weekly 5 - Week 14: One Last Chance",
      desc: "Never Give Up",
      author: "Papa Jack Media",
      date: "Dec 7",
      href: "/articles/wfl-weekly-14",
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
      </section>
    );
  }