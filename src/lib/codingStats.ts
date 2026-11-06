let cachedStats: any = null;
let pendingStatsPromise: Promise<any> | null = null;

// Build timestamp injected by Vite during deployment build for instant cache-busting
declare const __BUILD_TIMESTAMP__: string;

const STATS_URL =
  typeof __BUILD_TIMESTAMP__ !== "undefined"
    ? `/coding-journey-stats.json?v=${__BUILD_TIMESTAMP__}`
    : `/coding-journey-stats.json`;

export async function fetchCodingJourneyStats() {
  if (cachedStats) {
    return cachedStats;
  }

  if (!pendingStatsPromise) {
    pendingStatsPromise = fetch(STATS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load coding journey stats");
        return res.json();
      })
      .then((data) => {
        cachedStats = data;
        return data;
      })
      .catch((err) => {
        pendingStatsPromise = null;
        throw err;
      });
  }

  return pendingStatsPromise;
}
