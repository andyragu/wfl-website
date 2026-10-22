"use client";
import { useEffect, useMemo, useState } from "react";

type Team = {
  id: string;
  name: string;
  manager?: string;
  wins?: number;
  losses?: number;
  ties?: number;
  pf?: number;
};

type SleeperUser = {
  user_id: string;
  display_name: string;
  metadata?: { team_name?: string };
};

type SleeperRoster = {
  roster_id: number;
  owner_id: string;
  settings: {
    wins?: number;
    losses?: number;
    ties?: number;
    fpts?: number;
    fpts_decimal?: number;
  };
};

// Set your Sleeper league ID here, or pass it in as a prop.
const DEFAULT_LEAGUE_ID = process.env.NEXT_PUBLIC_SLEEPER_LEAGUE_ID ?? "1390398344668389376";

export default function Standings({ leagueId = DEFAULT_LEAGUE_ID }: { leagueId?: string }) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!leagueId) {
      setError("No Sleeper league ID configured.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchStandings() {
      try {
        setLoading(true);
        setError(null);

        const [rostersRes, usersRes] = await Promise.all([
          fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`),
          fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`),
        ]);

        if (!rostersRes.ok || !usersRes.ok) {
          throw new Error("Failed to fetch data from Sleeper.");
        }

        const rosters: SleeperRoster[] = await rostersRes.json();
        const users: SleeperUser[] = await usersRes.json();

        const userMap = new Map(users.map((u) => [u.user_id, u]));

        const mapped: Team[] = rosters.map((r) => {
          const user = userMap.get(r.owner_id);
          const teamName = user?.metadata?.team_name || user?.display_name || "Unknown Team";
          const pf =
            (r.settings.fpts ?? 0) + (r.settings.fpts_decimal ?? 0) / 100;

          return {
            id: String(r.roster_id),
            name: teamName,
            manager: user?.display_name,
            wins: r.settings.wins ?? 0,
            losses: r.settings.losses ?? 0,
            ties: r.settings.ties ?? 0,
            pf,
          };
        });

        if (!cancelled) setTeams(mapped);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStandings();
    return () => {
      cancelled = true;
    };
  }, [leagueId]);

  const sorted = useMemo(() => {
    return [...teams].sort((a, b) => {
      // wins desc, ties desc, losses asc, pf desc, name asc
      if ((b.wins ?? 0) !== (a.wins ?? 0)) return (b.wins ?? 0) - (a.wins ?? 0);
      if ((b.ties ?? 0) !== (a.ties ?? 0)) return (b.ties ?? 0) - (a.ties ?? 0);
      if ((a.losses ?? 0) !== (b.losses ?? 0)) return (a.losses ?? 0) - (b.losses ?? 0);
      if ((b.pf ?? 0) !== (a.pf ?? 0)) return (b.pf ?? 0) - (a.pf ?? 0);
      return a.name.localeCompare(b.name);
    });
  }, [teams]);

  return (
    <div className="w-full mx-auto max-w-4xl">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#CC0000]">Current Standings</h2>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        {loading ? (
          <div className="px-4 py-6 text-gray-500 text-sm">Loading standings…</div>
        ) : error ? (
          <div className="px-4 py-6 text-red-500 text-sm">{error}</div>
        ) : (
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
        )}
      </div>
    </div>
  );
}