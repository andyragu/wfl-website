"use client";
import { useMemo, useState } from "react";

type Team = {
  id: string;
  name: string;
  manager?: string;
  wins?: number;
  losses?: number;
  ties?: number;
};

const TEAMS: Team[] = [
  { id: "1",  name: "Take me to Valhalla Lamar", manager: "Andy",     wins: 1, losses: 0, ties: 0 },
  { id: "2",  name: "Came",                       manager: "Daniel",   wins: 0, losses: 1, ties: 0 },
  { id: "3",  name: "KRAFT YAC & CHEESE",         manager: "Drew",     wins: 1, losses: 0, ties: 0 },
  { id: "4",  name: "Wake and Baker Co.",         manager: "Jonah",    wins: 0, losses: 1, ties: 0 },
  { id: "5",  name: "The Bang Bros",              manager: "Andres",   wins: 1, losses: 0, ties: 0 },
  { id: "6",  name: "Marvin's Room",              manager: "Jack",     wins: 0, losses: 1, ties: 0 },
  { id: "7",  name: "How u gonna urmm naoww danggg", manager: "Ale",  wins: 1, losses: 0, ties: 0 },
  { id: "8",  name: "Hall of Fame Youtuber",      manager: "Fabian",   wins: 1, losses: 0, ties: 0 },
  { id: "9",  name: "Why you gotta up an jittleyang", manager: "Eric", wins: 0, losses: 1, ties: 0 },
  { id: "10", name: "Golden Boys",                manager: "Johnny",   wins: 0, losses: 1, ties: 0 },
  { id: "11", name: "Worse than WHL",             manager: "Jeremias", wins: 0, losses: 1, ties: 0 },
  { id: "12", name: "This is a call for help",    manager: "Parker",   wins: 1, losses: 0, ties: 0 },
];

function pct(w = 0, l = 0, t = 0) {
  const g = (w ?? 0) + (l ?? 0) + (t ?? 0);
  if (g === 0) return 0;
  return (w + 0.5 * (t ?? 0)) / g;
}

export default function Standings() {
  const [teams] = useState<Team[]>(TEAMS);

  const sorted = useMemo(() => {
    return [...teams].sort((a, b) => {
      if ((b.wins ?? 0) !== (a.wins ?? 0)) return (b.wins ?? 0) - (a.wins ?? 0);
      if ((b.ties ?? 0) !== (a.ties ?? 0)) return (b.ties ?? 0) - (a.ties ?? 0);
      if ((a.losses ?? 0) !== (b.losses ?? 0)) return (a.losses ?? 0) - (b.losses ?? 0);
      return a.name.localeCompare(b.name);
    });
  }, [teams]);

  return (
    <div className="w-full mx-auto max-w-4xl">
      <div className="flex items-end justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#A23131] leading-tight">
          Current Standings
        </h2>
      </div>

      {/* Mobile-safe container + table sizing */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full table-fixed text-xs sm:text-sm">
          <colgroup>
            <col className="w-10 sm:w-12" />
            <col /> {/* team grows */}
            <col className="hidden sm:table-column sm:w-28" />
            <col className="w-12 sm:w-16" />
            <col className="w-12 sm:w-16" />
          </colgroup>

        <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left">#</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left">Team</th>
              <th className="hidden sm:table-cell px-2 sm:px-3 py-2 sm:py-3 text-left">Manager</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center">W</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center">L</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((t, i) => (
              <tr key={t.id} className={i % 2 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-2 sm:px-3 py-2 sm:py-3 font-medium text-gray-700">
                  {i + 1}
                </td>
`
                <td className="px-2 sm:px-3 py-2 sm:py-3 text-gray-700 font-medium">
                  <div className="max-w-[140px] xs:max-w-[180px] sm:max-w-none truncate">
                    {t.name}
                  </div>
                </td>

                <td className="hidden sm:table-cell px-2 sm:px-3 py-2 sm:py-3 text-gray-600">
                  {t.manager ?? "-"}
                </td>

                <td className="px-2 sm:px-3 py-2 sm:py-3 text-gray-700 text-center">
                  {t.wins ?? 0}
                </td>
                <td className="px-2 sm:px-3 py-2 sm:py-3 text-gray-700 text-center">
                  {t.losses ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
