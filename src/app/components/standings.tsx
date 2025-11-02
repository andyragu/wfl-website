"use client";
import { useMemo, useState } from "react";

type Team = {
  id: string;
  name: string;
  manager?: string;
  wins?: number;
  losses?: number;
  ties?: number;
  pf?: number;
};

const TEAMS: Team[] = [
  { id: "1",  name: "yakub", manager: "Andy",     wins: 6, losses: 2, ties: 0, pf: 1063.22 },
  { id: "2",  name: "Cumming...",                         manager: "Daniel",   wins: 1, losses: 7, ties: 0, pf: 901.74 },
  { id: "3",  name: "KRAFT YAC & CHEESE",           manager: "Drew",     wins: 6, losses: 2, ties: 0, pf: 1156.00 },
  { id: "4",  name: "Wake and Baker Co.",           manager: "Jonah",    wins: 5, losses: 3, ties: 0, pf: 1127.68 },
  { id: "5",  name: "The Bang Bros",                manager: "Andres",   wins: 2, losses: 6, ties: 0, pf: 981.44  },
  { id: "6",  name: "Marvin's Room",                manager: "Jack",   wins: 3, losses: 5, ties: 0, pf: 1027.42  },
  { id: "7",  name: "I ❤️ Ohio",                   manager: "Ale",      wins: 6, losses: 2, ties: 0, pf: 1074.30 },
  { id: "8",  name: "Hall of Fame Youtuber",        manager: "Fabian",   wins: 4, losses: 4, ties: 0, pf: 1029.48 },
  { id: "9",  name: "Build the Waller",               manager: "Eric",    wins: 4, losses: 4, ties: 0, pf: 1040.94 },
  { id: "10", name: "Rico Suave",                  manager: "Johnny",   wins: 3, losses: 5, ties: 0, pf: 896.58},
  { id: "11", name: "Worse than WHL",               manager: "Jeremias", wins: 4, losses: 4, ties: 0, pf: 1161.12},
  { id: "12", name: "Rome wasn't built in a day",      manager: "Parker",   wins: 4, losses: 4, ties: 0, pf: 1178.54},
];

export default function Standings() {
  const [teams] = useState<Team[]>(TEAMS);

  const sorted = useMemo(() => {
    return [...teams].sort((a, b) => {
      // wins desc, ties desc, losses asc, name asc
      if ((b.wins ?? 0) !== (a.wins ?? 0)) return (b.wins ?? 0) - (a.wins ?? 0);
      if ((b.ties ?? 0) !== (a.ties ?? 0)) return (b.ties ?? 0) - (a.ties ?? 0);
      if ((a.losses ?? 0) !== (b.losses ?? 0)) return (a.losses ?? 0) - (b.losses ?? 0);
      if (((b.wins ?? 0) == (a.wins ?? 0) ) && ((b.ties ?? 0) == (a.ties ?? 0)) && ((a.losses ?? 0) == (b.losses ?? 0))) return (b.pf ?? 0) - (a.pf ?? 0);
      return a.name.localeCompare(b.name);
    });
  }, [teams]);

  return (
    <div className="w-full mx-auto max-w-4xl">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2l font-bold text-[#A23131]">Current Standings</h2>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left w-12">#</th>
              <th className="px-4 py-3 text-left">Team</th>
              <th className="px-4 py-3 text-left">Manager</th>
              <th className="px-4 py-3 text-center w-24">W</th>
              <th className="px-4 py-3 text-center w-24">L</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t, i) => (
              <tr key={t.id} className={i % 2 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-4 py-3 font-medium text-gray-700">{i + 1}</td>
                <td className="px-4 py-3 text-gray-600 font-medium">{t.name}</td>
                <td className="px-4 py-3 text-gray-600">{t.manager ?? "-"}</td>
                <td className="px-4 py-3 text-gray-600 text-center">{t.wins ?? 0}</td>
                <td className="px-4 py-3 text-gray-600 text-center">{t.losses ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
