import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContributionDay = {
  date: string;
  count: number;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type PublicContributionPayload = {
  total: {
    lastYear: number;
  };
  contributions: Array<{
    date: string;
    count: number;
  }>;
};

type GitHubUser = {
  followers: number;
  public_repos: number;
};

type GitHubRepo = {
  stargazers_count: number;
  forks_count: number;
};

type GitHubState = {
  weeks: ContributionWeek[];
  total: number;
  followers: number;
  stars: number;
  forks: number;
};

function chunkWeeks(days: ContributionDay[]) {
  const weeks: ContributionWeek[] = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push({ contributionDays: days.slice(index, index + 7) });
  }
  return weeks;
}

function intensity(count: number) {
  if (count === 0) return "bg-white/[0.045]";
  if (count < 3) return "bg-cyan-400/25";
  if (count < 7) return "bg-blue-400/45";
  if (count < 14) return "bg-violet-400/65";
  return "bg-fuchsia-300/85";
}

async function fetchGitHubStats(username: string): Promise<GitHubState> {
  const [contributionResponse, userResponse, reposResponse] = await Promise.all([
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`),
  ]);

  if (!contributionResponse.ok || !userResponse.ok || !reposResponse.ok) {
    throw new Error("Could not load GitHub stats.");
  }

  const contributionPayload = (await contributionResponse.json()) as PublicContributionPayload;
  const user = (await userResponse.json()) as GitHubUser;
  const repos = (await reposResponse.json()) as GitHubRepo[];
  const days = contributionPayload.contributions.map((day) => ({ date: day.date, count: day.count }));

  return {
    weeks: chunkWeeks(days),
    total: contributionPayload.total.lastYear,
    followers: user.followers,
    stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    forks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
  };
}

export default function GitHubContributions({ username }: { username: string }) {
  const [state, setState] = useState<GitHubState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const months = useMemo(() => ["Jan", "Mar", "May", "Jul", "Sep", "Nov"], []);

  const load = () => {
    setLoading(true);
    setError("");
    fetchGitHubStats(username)
      .then(setState)
      .catch((loadError: Error) => setError(loadError.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [username]);

  if (loading) {
    return (
      <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5 text-sm text-muted-foreground">
        Loading real GitHub contribution data...
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5">
        <p className="text-sm text-muted-foreground">Could not load GitHub stats.</p>
        <Button variant="outline" size="sm" onClick={load} className="mt-4 rounded-full">
          <RefreshCw className="mr-2 size-4" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          [state.total.toLocaleString(), "Contributions last year"],
          [state.followers.toLocaleString(), "Followers"],
          [state.stars.toLocaleString(), "Repository stars"],
          [state.forks.toLocaleString(), "Repository forks"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-3xl border border-white/[0.10] bg-white/[0.035] p-5">
            <p className="font-display text-4xl text-zinc-100">{value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-zinc-950/50 p-4">
        <div className="mb-3 grid min-w-[760px] grid-cols-6 text-xs text-zinc-600">
          {months.map((month) => <span key={month}>{month}</span>)}
        </div>
        <div className="flex min-w-[760px] gap-1">
          {state.weeks.map((week, weekIndex) => (
            <div key={`${weekIndex}-${week.contributionDays[0]?.date}`} className="grid gap-1">
              {week.contributionDays.map((day) => (
                <span key={day.date} title={`${day.date}: ${day.count} contributions`} className={`size-3 rounded-[3px] ${intensity(day.count)}`} />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-zinc-500">
          <span>Less</span>
          {[0, 2, 5, 10, 18].map((count) => <span key={count} className={`size-3 rounded-[3px] ${intensity(count)}`} />)}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
