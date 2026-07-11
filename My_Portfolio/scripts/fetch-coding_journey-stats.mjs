// scripts/fetch-coding_journey-stats.mjs

import fs from "fs";
import path from "path";

const OUTPUT_FILE = path.join(process.cwd(), "public", "coding-journey-stats.json");

const CF_HANDLE = "Adree";
const LC_USERNAME = "Aditya_chauhan__";
const CC_USERNAME = "chauhanaditya5";
const GFG_USERNAME = "adityacha9ddw";
const GITHUB_USERNAME = "0xAditya-Labs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// =============================================================================
// LeetCode
// =============================================================================

async function lcGraphQL(query, variables) {
  const res = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(`LeetCode GraphQL error: ${JSON.stringify(json.errors)}`);
  return json.data;
}

async function getLeetCodeStats() {
  const contestQuery = `
    query userContestInfo($username: String!) {
      userContestRanking(username: $username) { rating topPercentage attendedContestsCount }
      userContestRankingHistory(username: $username) {
        attended rating contest { title startTime }
      }
    }`;
  const contestData = await lcGraphQL(contestQuery, { username: LC_USERNAME });
  const ranking = contestData.userContestRanking || {};
  const history = (contestData.userContestRankingHistory || [])
    .filter((e) => e.attended)
    .map((e) => ({ timestamp: e.contest.startTime * 1000, rating: Math.round(e.rating) }));
  const maxRating = history.length ? Math.max(...history.map((h) => h.rating)) : null;

  const profileQuery = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal { acSubmissionNum { difficulty count } }
        userCalendar { submissionCalendar }
      }
    }`;
  const profileData = await lcGraphQL(profileQuery, { username: LC_USERNAME });
  const user = profileData.matchedUser || {};
  const solvedArr = user.submitStatsGlobal?.acSubmissionNum || [];
  const find = (d) => solvedArr.find((s) => s.difficulty === d)?.count ?? 0;

  let calendar = {};
  try { calendar = JSON.parse(user.userCalendar?.submissionCalendar || "{}"); } catch { /* ignore */ }

  return {
    currentRating: ranking.rating ? Math.round(ranking.rating) : null,
    maxRating,
    topPercentage: ranking.topPercentage ?? null,
    contestsCount: ranking.attendedContestsCount ?? history.length,
    easySolved: find("Easy"),
    mediumSolved: find("Medium"),
    hardSolved: find("Hard"),
    totalSolved: find("All"),
    history,
    _calendar: calendar,
  };
}

// =============================================================================
// Codeforces
// =============================================================================

function cfRankFromRating(rating) {
  if (rating == null) return null;
  if (rating < 1200) return "Newbie";
  if (rating < 1400) return "Pupil";
  if (rating < 1600) return "Specialist";
  if (rating < 1900) return "Expert";
  if (rating < 2100) return "Candidate Master";
  if (rating < 2300) return "Master";
  if (rating < 2400) return "International Master";
  if (rating < 2600) return "Grandmaster";
  if (rating < 3000) return "International Grandmaster";
  return "Legendary Grandmaster";
}

async function getCodeforcesStats() {
  const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${CF_HANDLE}`);
  const infoData = await infoRes.json();
  if (infoData.status !== "OK") throw new Error(`CF user.info error: ${infoData.comment}`);
  const user = infoData.result[0];

  await sleep(1500);

  const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${CF_HANDLE}`);
  const ratingData = await ratingRes.json();
  if (ratingData.status !== "OK") throw new Error(`CF user.rating error: ${ratingData.comment}`);
  const history = ratingData.result.map((c) => ({
    timestamp: c.ratingUpdateTimeSeconds * 1000,
    rating: c.newRating,
  }));

  await sleep(1500);

  const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${CF_HANDLE}`);
  const statusData = await statusRes.json();
  if (statusData.status !== "OK") throw new Error(`CF user.status error: ${statusData.comment}`);

  const solvedSet = new Set();
  const calendar = {};
  for (const sub of statusData.result) {
    if (sub.verdict === "OK") {
      solvedSet.add(`${sub.problem.contestId ?? sub.problem.problemsetName}-${sub.problem.index}`);
      const day = new Date(sub.creationTimeSeconds * 1000).toISOString().slice(0, 10);
      calendar[day] = (calendar[day] || 0) + 1;
    }
  }

  const maxRating = user.maxRating ?? null;

  return {
    currentRating: user.rating ?? null,
    maxRating,
    currentRankTitle: user.rank ?? null,
    maxRankTitle: cfRankFromRating(maxRating),
    contestsCount: history.length,
    totalSolved: solvedSet.size,
    history,
    _calendar: calendar,
  };
}

// =============================================================================
// CodeChef — real data source: inline `all_rating = [...]` JS array in the HTML
// =============================================================================

function ccStarsFromRating(rating) {
  if (rating == null) return null;
  if (rating < 1400) return "★";
  if (rating < 1600) return "★★";
  if (rating < 1800) return "★★★";
  if (rating < 2000) return "★★★★";
  if (rating < 2200) return "★★★★★";
  if (rating < 2500) return "★★★★★★";
  return "★★★★★★★";
}

function extractBalancedArray(html, marker) {
  const startIdx = html.indexOf(marker);
  if (startIdx === -1) return null;
  const arrStart = html.indexOf("[", startIdx);
  let depth = 0;
  for (let i = arrStart; i < html.length; i++) {
    if (html[i] === "[") depth++;
    if (html[i] === "]") {
      depth--;
      if (depth === 0) return html.slice(arrStart, i + 1);
    }
  }
  return null;
}

async function getCodeChefStats() {
  const res = await fetch(`https://www.codechef.com/users/${CC_USERNAME}`);
  const html = await res.text();

  const raw = extractBalancedArray(html, "all_rating = ");
  if (!raw) throw new Error("CodeChef: all_rating array not found on page");

  const contests = JSON.parse(raw);
  const history = contests.map((c) => ({
    timestamp: new Date(`${c.getyear}-${String(c.getmonth).padStart(2, "0")}-${String(c.getday).padStart(2, "0")}`).getTime(),
    rating: Number(c.rating),
    name: c.name,
  }));

  const ratings = history.map((h) => h.rating).filter((n) => !isNaN(n));
  const currentRating = ratings.length ? ratings[ratings.length - 1] : null;
  const maxRating = ratings.length ? Math.max(...ratings) : null;

  const solvedMatch = html.match(/Total\s+Problems\s+Solved[^\d]*(\d[\d,]*)/i);
  const totalSolved = solvedMatch ? Number(solvedMatch[1].replace(/,/g, "")) : null;

  return {
    currentRating,
    maxRating,
    stars: ccStarsFromRating(currentRating),
    maxStars: ccStarsFromRating(maxRating),
    contestsCount: contests.length,
    totalSolved,
    history,
  };
}

// =============================================================================
// GeeksforGeeks — real key: "total_problems_solved":N in the RSC payload
// =============================================================================

async function getGfgStats() {
  const res = await fetch(`https://www.geeksforgeeks.org/profile/${GFG_USERNAME}`);
  const html = await res.text();
  const match = html.match(/"total_problems_solved":(\d+)/);
  return { totalSolved: match ? Number(match[1]) : null };
}

// =============================================================================
// GitHub — DISABLED (near-zero activity). Uncomment call in main() to re-enable.
// =============================================================================

async function getGitHubContributions() {
  const res = await fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions`);
  const html = await res.text();
  const dayRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d+)"/g;
  const days = [];
  let match;
  while ((match = dayRegex.exec(html)) !== null) {
    days.push({ date: match[1], level: Number(match[2]) });
  }
  return days;
}

// =============================================================================
// Merge LC + CF calendars, capped to last 365 days
// =============================================================================

function toDateKey(k) {
  if (/^\d+$/.test(String(k))) return new Date(Number(k) * 1000).toISOString().slice(0, 10);
  return k;
}

function mergeHeatmapAndActiveDays(lcCalendar, cfCalendar) {
  const merged = {};
  for (const [k, c] of Object.entries(lcCalendar)) { const d = toDateKey(k); merged[d] = (merged[d] || 0) + c; }
  for (const [k, c] of Object.entries(cfCalendar)) { const d = toDateKey(k); merged[d] = (merged[d] || 0) + c; }

  const oneYearAgo = new Date();
  oneYearAgo.setDate(oneYearAgo.getDate() - 365);
  const cutoff = oneYearAgo.toISOString().slice(0, 10);

  const heatmap = Object.entries(merged)
    .map(([date, count]) => ({ date, count }))
    .filter((entry) => entry.date >= cutoff)
    .sort((a, b) => a.date.localeCompare(b.date));

  const totalActiveDays = Object.keys(merged).length;

  return { heatmap, totalActiveDays };
}

// =============================================================================
// Main
// =============================================================================

async function main() {
  const result = {
    leetcode: {}, codeforces: {}, codechef: {}, gfg: {},
    // github: {},  // <-- uncomment when re-enabling GitHub
    heatmap: [], errors: [],
  };

  console.log("Fetching LeetCode...");
  let lcCalendar = {};
  try {
    const lc = await getLeetCodeStats();
    lcCalendar = lc._calendar;
    delete lc._calendar;
    result.leetcode = lc;
  } catch (e) {
    result.errors.push(`LeetCode: ${e.message}`);
  }

  await sleep(1500);

  console.log("Fetching Codeforces...");
  let cfCalendar = {};
  try {
    const cf = await getCodeforcesStats();
    cfCalendar = cf._calendar;
    delete cf._calendar;
    result.codeforces = cf;
  } catch (e) {
    result.errors.push(`Codeforces: ${e.message}`);
  }

  await sleep(1500);

  console.log("Fetching CodeChef...");
  try {
    result.codechef = await getCodeChefStats();
  } catch (e) {
    result.errors.push(`CodeChef: ${e.message}`);
  }

  await sleep(1500);

  console.log("Fetching GFG...");
  try {
    result.gfg = await getGfgStats();
  } catch (e) {
    result.errors.push(`GFG: ${e.message}`);
  }

  // --- GitHub fetch — disabled. Uncomment to re-enable. ---
  // await sleep(1500);
  // console.log("Fetching GitHub...");
  // try {
  //   result.github = await getGitHubContributions();
  // } catch (e) {
  //   result.errors.push(`GitHub: ${e.message}`);
  // }

  console.log("Merging heatmap + computing active days...");
  const { heatmap, totalActiveDays } = mergeHeatmapAndActiveDays(lcCalendar, cfCalendar);
  result.heatmap = heatmap;
  result.totalActiveDays = totalActiveDays;

  result.totalSolvedAllPlatforms =
    (result.leetcode.totalSolved || 0) +
    (result.codeforces.totalSolved || 0) +
    (result.codechef.totalSolved || 0) +
    (result.gfg.totalSolved || 0);

  result.lastUpdated = new Date().toISOString();

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));

  console.log(`\nSaved to ${OUTPUT_FILE}`);
  console.log("LeetCode:", { ...result.leetcode, history: `[${result.leetcode.history?.length ?? 0} entries]` });
  console.log("Codeforces:", { ...result.codeforces, history: `[${result.codeforces.history?.length ?? 0} entries]` });
  console.log("CodeChef:", { ...result.codechef, history: `[${result.codechef.history?.length ?? 0} entries]` });
  console.log("GFG:", result.gfg);
  console.log(`Heatmap: ${result.heatmap.length} days (last 1yr) | Active days (lifetime): ${result.totalActiveDays}`);
  console.log(`Total solved, all platforms: ${result.totalSolvedAllPlatforms}`);
  if (result.errors.length) console.log("\nErrors:", result.errors);
}

main();