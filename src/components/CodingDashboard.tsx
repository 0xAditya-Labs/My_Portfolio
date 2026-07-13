import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code2,
  Calendar,
  TrendingUp,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Flame,
  Monitor,
  Github,
  Target,
  Trophy,
  X,
} from "lucide-react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ─────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────
const LC_USER = "Aditya_chauhan__";
const CF_USER = "Adree";
const CC_USER = "chauhanaditya5";
const GFG_USER = "adityacha9ddw";
const GITHUB_USER = "0xAditya-Labs";

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────
interface RatingPoint {
  timestamp: number;
  rating: number;
}

interface LeetCodeData {
  currentRating: number | null;
  maxRating: number | null;
  topPercentage: number | null;
  contestsCount: number | null;
  easySolved: number | null;
  mediumSolved: number | null;
  hardSolved: number | null;
  totalSolved: number | null;
  history: RatingPoint[];
}

interface CodeforcesData {
  currentRating: number | null;
  maxRating: number | null;
  currentRankTitle: string | null;
  maxRankTitle: string | null;
  contestsCount: number | null;
  totalSolved: number | null;
  history: RatingPoint[];
}

interface CodeChefData {
  currentRating: number | null;
  maxRating: number | null;
  stars: string | null;
  maxStars: string | null;
  contestsCount: number | null;
  totalSolved: number | null;
  history: RatingPoint[];
}

interface GfgData {
  totalSolved: number | null;
}

interface HeatmapDay {
  date: string;
  count: number;
}

interface CodingJourneyStats {
  leetcode: LeetCodeData;
  codeforces: CodeforcesData;
  codechef: CodeChefData;
  gfg: GfgData;
  heatmap: HeatmapDay[];
  totalActiveDays: number | null;
  totalSolvedAllPlatforms: number | null;
  lastUpdated: string | null;
}

// ─────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────

/** Animates 0 → target over ~400ms (ease-out) once `enabled` flips true. */
function useCountUp(target: number | null, enabled: boolean): number {
  const [display, setDisplay] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!enabled || hasRun.current || target == null || target <= 0) return;
    hasRun.current = true;

    const duration = 420;
    const fps = 60;
    const steps = Math.round((duration / 1000) * fps);
    let frame = 0;

    const id = setInterval(() => {
      frame++;
      // ease-out cubic: t starts at 1 and curves down
      const t = frame / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * (target ?? 0)));
      if (frame >= steps) {
        clearInterval(id);
        setDisplay(target ?? 0);
      }
    }, 1000 / fps);

    return () => clearInterval(id);
  }, [enabled, target]);

  return target == null ? 0 : display;
}

/** Returns true once the element enters the viewport (fires once). */
function useInView(ref: React.RefObject<HTMLElement | null>): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────
function fmtRelative(iso: string | null): string {
  if (!iso) return "unknown";
  const diff = Date.now() - new Date(iso).getTime();
  const hrs = Math.floor(diff / 3_600_000);
  if (hrs < 1) return "just now";
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function historyToChartData(history: RatingPoint[]): { date: string; rating: number }[] {
  return history.map((p) => ({
    date: new Date(p.timestamp).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
    rating: p.rating,
  }));
}

function getCfRankExplanation(rank: string | null) {
  const r = rank?.toLowerCase() || "";
  let desc = "";
  if (r.includes("newbie")) {
    desc = "Newbie is the entry-level rank, indicating initial participation and basic problem-solving skills.";
  } else if (r.includes("pupil")) {
    desc = "Pupil indicates solid foundational coding and growing familiarity with classic algorithms.";
  } else if (r.includes("specialist")) {
    desc = "Specialist represents the top ~15% of active users, showing consistent contest performance and strong data structures knowledge.";
  } else if (r.includes("expert")) {
    desc = "Expert is a highly respected milestone, showcasing deep algorithmic mastery and fast implementation speed.";
  } else if (r.includes("candidate master")) {
    desc = "Candidate Master marks the entrance into elite competitive programming tiers.";
  } else if (r.includes("master") && !r.includes("candidate")) {
    desc = "Master/International Master represents world-class algorithmic proficiency.";
  } else if (r.includes("grandmaster")) {
    desc = "Grandmaster/Legendary Grandmaster is the absolute pinnacle of competitive programming.";
  } else {
    desc = "Reflects algorithmic accuracy and speed under tight contest time limits.";
  }

  return (
    <div className="space-y-2 mt-1">
      <p>{desc}</p>
      <div className="pt-2 border-t border-border/30">
        <span className="block font-medium text-foreground mb-1 text-[10px] uppercase tracking-wider">Codeforces Rating Hierarchy:</span>
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] text-muted-foreground/75">
          <div>• Newbie: &lt; 1200</div>
          <div>• Pupil: 1200–1399</div>
          <div>• Specialist: 1400–1599</div>
          <div>• Expert: 1600–1899</div>
          <div>• Candidate Master: 1900–2099</div>
          <div>• Master / IM: 2100–2399</div>
          <div>• Grandmaster+: 2400+</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

/** Small external link icon pinned to top-right of a card */
const ProfileLink = ({ url, label }: { url: string; label: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    title={`Open ${label} profile`}
    className="absolute top-4 right-4 text-muted-foreground/50 hover:text-foreground transition-colors"
    aria-label={`${label} profile`}
  >
    <ExternalLink className="w-3.5 h-3.5" />
  </a>
);

/** Recharts custom tooltip */
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="cj-tooltip">
      <p className="cj-tooltip-label">{label}</p>
      <p className="cj-tooltip-value">{payload[0].value}</p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────
const CodingDashboard = () => {
  const [stats, setStats] = useState<CodingJourneyStats | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [cfExpanded, setCfExpanded] = useState(false);
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const [lcExpanded, setLcExpanded] = useState(false);

  // Heatmap tooltip state (preserved from original implementation)
  const heatmapRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean; x: number; y: number; left: number; top: number; text: string;
  }>({ visible: false, x: 0, y: 0, left: 0, top: 0, text: "" });

  // IntersectionObserver ref for count-up trigger
  const statsRowRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRowRef);

  // Count-up values for the 4 headline cards
  const lcMaxRating = useCountUp(stats?.leetcode?.maxRating ?? null, statsInView);
  const cfMaxRating = useCountUp(stats?.codeforces?.maxRating ?? null, statsInView);
  const totalSolved = useCountUp(stats?.totalSolvedAllPlatforms ?? null, statsInView);
  const activeDays = useCountUp(stats?.totalActiveDays ?? null, statsInView);

  // LeetCode Badge Logic
  const rawLcMaxRating = stats?.leetcode?.maxRating;
  let lcBadge = null;
  if (rawLcMaxRating != null) {
    if (rawLcMaxRating >= 2150) {
      lcBadge = { src: "/badge-guardian.png", name: "Guardian" };
    } else if (rawLcMaxRating >= 1850) {
      lcBadge = { src: "/badge-knight.png", name: "Knight" };
    }
  }

  // ── Fetch stats JSON once ──────────────────────────────────────
  useEffect(() => {
    fetch("/coding-journey-stats.json")
      .then((r) => { if (!r.ok) throw new Error("Failed to load stats"); return r.json(); })
      .then((data: CodingJourneyStats) => {
        setStats(data);
        // small delay so fade-in is visible
        requestAnimationFrame(() => setLoaded(true));
      })
      .catch(() => setLoaded(true)); // still reveal UI even on error
  }, []);

  // ── Heatmap tooltip (ported, preserved logic) ──────────────────
  useEffect(() => {
    let container = heatmapRef.current;
    if (!container) return;

    const adjust = (opts?: { retries?: number; anchorX?: number; anchorY?: number }) => {
      if (!tooltipRef.current || !container) return;
      const tt = tooltipRef.current;
      const bounds = container.getBoundingClientRect();
      const ttW = tt.offsetWidth;
      const ttH = tt.offsetHeight;
      const retries = opts?.retries ?? 0;
      if ((ttW === 0 || ttH === 0) && retries < 3) {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => adjust({ retries: retries + 1, anchorX: opts?.anchorX, anchorY: opts?.anchorY }))
        );
        setTimeout(() => adjust({ retries: retries + 1, anchorX: opts?.anchorX, anchorY: opts?.anchorY }), 16 + retries * 10);
        return;
      }
      setTooltip((prev) => {
        if (!prev.visible) return prev;
        let left = (opts?.anchorX ?? prev.x) + 12;
        let top = (opts?.anchorY ?? prev.y) + 12;
        if (left + ttW > bounds.width) left = Math.max((opts?.anchorX ?? prev.x) - ttW - 12, 8);
        if (top + ttH > bounds.height) top = Math.max(bounds.height - ttH - 8, 8);
        return { ...prev, left, top };
      });
    };

    const resolveCellFromEvent = (e: PointerEvent) => {
      try {
        const cp: any[] = typeof (e as any).composedPath === "function" ? (e as any).composedPath() : [];
        for (const el of cp || []) {
          if (!el || !(el as Element).getAttribute) continue;
          if ((el as Element).hasAttribute && (el as Element).hasAttribute("data-date")) return el as Element;
        }
        const target = e.target as Element | null;
        if (target) {
          const c = target.closest?.("[data-date]");
          if (c) return c as Element;
        }
        const fromPoint = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
        if (fromPoint) {
          const c2 = (fromPoint as Element).closest?.("[data-date]");
          if (c2) return c2 as Element;
        }
      } catch { /* ignore */ }
      return null;
    };

    const onPointerMove = (e: PointerEvent) => {
      const el = resolveCellFromEvent(e);
      if (el) {
        const date = el.getAttribute("data-date") || "";
        const count = el.getAttribute("data-count") || "0";
        const title = el.getAttribute("data-title") || `${count} submissions on ${date}`;
        const bounds = container!.getBoundingClientRect();
        const anchorX = e.clientX - bounds.left;
        const anchorY = e.clientY - bounds.top;
        setTooltip({ visible: true, x: anchorX, y: anchorY, left: anchorX + 12, top: anchorY + 12, text: title });
        requestAnimationFrame(() => requestAnimationFrame(() => adjust({ retries: 0, anchorX, anchorY })));
      } else {
        setTooltip((t) => (t.visible ? { ...t, visible: false } : t));
      }
    };

    const onPointerOver = (e: PointerEvent) => onPointerMove(e);
    const onPointerOut = () => setTooltip((t) => (t.visible ? { ...t, visible: false } : t));
    const onResize = () => adjust();

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerover", onPointerOver);
    container.addEventListener("pointerout", onPointerOut);
    window.addEventListener("resize", onResize);

    // Per-rect listeners (robust fallback)
    const attachedRects: Array<{ el: Element; move: EventListener; enter: EventListener; leave: EventListener }> = [];

    const attachPerRectListeners = (attempt = 0) => {
      const nodes = container!.querySelectorAll("[data-date]");
      if (!nodes || nodes.length === 0) {
        if (attempt < 5) setTimeout(() => attachPerRectListeners(attempt + 1), 100 + attempt * 50);
        return;
      }
      nodes.forEach((n) => {
        const move = (ev: Event) => onPointerMove(ev as unknown as PointerEvent);
        const enter = (ev: Event) => onPointerOver(ev as unknown as PointerEvent);
        const leave = () => onPointerOut();
        n.addEventListener("pointermove", move);
        n.addEventListener("pointerenter", enter);
        n.addEventListener("pointerleave", leave);
        attachedRects.push({ el: n, move, enter, leave });
      });
    };

    attachPerRectListeners();

    let mo: MutationObserver | null = null;
    if (container && typeof MutationObserver !== "undefined") {
      mo = new MutationObserver(() => attachPerRectListeners());
      mo.observe(container, { childList: true, subtree: true });
    }

    return () => {
      try { container?.removeEventListener("pointermove", onPointerMove); } catch { /* */ }
      try { container?.removeEventListener("pointerover", onPointerOver); } catch { /* */ }
      try { container?.removeEventListener("pointerout", onPointerOut); } catch { /* */ }
      try { window.removeEventListener("resize", onResize); } catch { /* */ }
      attachedRects.forEach(({ el, move, enter, leave }) => {
        try { el.removeEventListener("pointermove", move); } catch { /* */ }
        try { el.removeEventListener("pointerenter", enter); } catch { /* */ }
        try { el.removeEventListener("pointerleave", leave); } catch { /* */ }
      });
      try { mo?.disconnect(); } catch { /* */ }
    };
  }, [stats]); // re-attach when stats arrive and heatmap renders

  // ── Derived chart data ─────────────────────────────────────────
  const lcChartData = stats?.leetcode?.history?.length
    ? historyToChartData(stats.leetcode.history)
    : [];
  const cfChartData = stats?.codeforces?.history?.length
    ? historyToChartData(stats.codeforces.history)
    : [];

  const lc = stats?.leetcode;
  const donutData = (
    lc?.easySolved != null || lc?.mediumSolved != null || lc?.hardSolved != null
  )
    ? [
      { name: "Easy", value: lc?.easySolved ?? 0, color: "#22c55e" },
      { name: "Medium", value: lc?.mediumSolved ?? 0, color: "#f59e0b" },
      { name: "Hard", value: lc?.hardSolved ?? 0, color: "#ef4444" },
    ]
    : [];

  const heatmapValues: HeatmapDay[] = stats?.heatmap ?? [];

  // ── Responsive chart tick count ────────────────────────────────
  const [chartMaxTicks, setChartMaxTicks] = useState(8);
  useEffect(() => {
    const update = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1024;
      setChartMaxTicks(w < 640 ? 4 : w < 1024 ? 6 : 8);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const xAxisInterval = useCallback(
    (len: number) => (len > 0 ? Math.max(0, Math.floor((len - 1) / chartMaxTicks)) : 0),
    [chartMaxTicks]
  );

  // ── Render ─────────────────────────────────────────────────────
  return (
    <section
      className="py-20 px-6 bg-gradient-to-b from-background to-muted/20"
      id="coding-dashboard"
      style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Coding Journey
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Daily consistency and continuous learning
          </p>
          {/* Platform profile links */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {[
              { name: "LeetCode", url: `https://leetcode.com/${LC_USER}`, user: LC_USER, icon: "/icons/LeetCode_logo_black.png", hoverBorder: "hover:border-[#5e6ad2]/50" },
              { name: "Codeforces", url: `https://codeforces.com/profile/${CF_USER}`, user: CF_USER, icon: "/icons/codeforces.webp", hoverBorder: "hover:border-[#e87a36]/50" },
              { name: "CodeChef", url: `https://www.codechef.com/users/${CC_USER}`, user: CC_USER, icon: "/icons/codechef.png", hoverBorder: "hover:border-amber-600/50" },
              { name: "GeeksforGeeks", url: `https://www.geeksforgeeks.org/user/${GFG_USER}`, user: GFG_USER, icon: "/icons/GeeksForGeeks_logo.png", hoverBorder: "hover:border-green-600/50" },
              { name: "GitHub", url: `https://github.com/${GITHUB_USER}`, user: GITHUB_USER, icon: Github, hoverBorder: "hover:border-black/50 dark:hover:border-white/50" },
            ].map(({ name, url, user, icon, hoverBorder }) => {
              const IconComponent = typeof icon !== "string" ? icon : null;
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border border-border/60 bg-card hover:shadow-lg transition-all duration-300 text-sm font-medium text-foreground hover:-translate-y-1 ${hoverBorder}`}
                >
                  <div className="p-1 rounded bg-foreground/5 dark:bg-foreground/10 flex-shrink-0 border border-border/40 flex items-center justify-center">
                    {IconComponent ? (
                      <IconComponent className="w-3.5 h-3.5 text-black dark:text-white fill-current opacity-80" />
                    ) : (
                      <img src={icon as string} alt={name} className={`w-3.5 h-3.5 object-contain opacity-80 ${name === 'LeetCode' ? 'dark:invert' : ''}`} />
                    )}
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="mb-0.5 font-bold">{name}</span>
                    <span className="text-[10px] text-muted-foreground font-normal">@{user}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* ── Headline Stat Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" ref={statsRowRef}>

          {/* LeetCode max rating */}
          <Card className="cj-stat-card relative group transition-all duration-300">
            <ProfileLink url={`https://leetcode.com/${LC_USER}`} label="LeetCode" />
            {lcBadge && (
              <img
                src={lcBadge.src}
                alt={lcBadge.name}
                title={`LeetCode ${lcBadge.name}`}
                className="absolute top-1/2 -translate-y-1/2 right-6 w-14 h-14 object-contain drop-shadow-md opacity-[0.85] transition-transform duration-300 group-hover:scale-[1.05]"
              />
            )}
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1.5">
                <img src="/icons/LeetCode_logo_black.png" className="w-4 h-4 dark:invert opacity-70" alt="LeetCode" />
                <p className="cj-stat-label mb-0 uppercase tracking-wider">LeetCode Peak</p>
              </div>
              <div className="w-5 h-0.5 bg-[#5e6ad2] mb-3 rounded-full opacity-80 transition-all duration-300 group-hover:w-[40%]" />
              <div className="cj-stat-value text-lc tabular-nums" style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
                {stats?.leetcode?.maxRating != null ? lcMaxRating : "—"}
              </div>
              {stats?.leetcode?.topPercentage != null && (
                <p className="cj-stat-sub">Top {stats.leetcode.topPercentage}%</p>
              )}
            </CardContent>
          </Card>

          {/* Codeforces max rating */}
          <Card className="cj-stat-card relative group transition-all duration-300">
            <ProfileLink url={`https://codeforces.com/profile/${CF_USER}`} label="Codeforces" />
            <div className="absolute top-1/2 -translate-y-1/2 right-6 w-14 h-14 flex items-center justify-center rounded-full bg-[#e87a36]/10 border border-[#e87a36]/20 shadow-inner opacity-[0.85] transition-transform duration-300 group-hover:scale-[1.05]">
              <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="10" width="4" height="11" rx="1" fill="#e87a36" className="opacity-90" />
                <rect x="10" y="3" width="4" height="18" rx="1" fill="#3182ce" className="opacity-90" />
                <rect x="17" y="7" width="4" height="14" rx="1" fill="#ecc94b" className="opacity-90" />
              </svg>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1.5">
                <img src="/icons/codeforces.webp" className="w-4 h-4 opacity-70" alt="Codeforces" />
                <p className="cj-stat-label mb-0 uppercase tracking-wider">Codeforces Peak</p>
              </div>
              <div className="w-5 h-0.5 bg-[#e87a36] mb-3 rounded-full opacity-80 transition-all duration-300 group-hover:w-[40%]" />
              <div className="cj-stat-value text-cf tabular-nums" style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
                {stats?.codeforces?.maxRating != null ? cfMaxRating : "—"}
              </div>
              {stats?.codeforces?.maxRankTitle && (
                <p className="cj-stat-sub font-medium">{stats.codeforces.maxRankTitle}</p>
              )}
            </CardContent>
          </Card>

          {/* Total Solved */}
          <Card className="cj-stat-card relative group transition-all duration-300">
            <div className="absolute top-1/2 -translate-y-1/2 right-6 w-14 h-14 flex items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-inner opacity-[0.85] transition-transform duration-300 group-hover:scale-[1.05]">
              <Code2 className="w-7 h-7 text-indigo-500 dark:text-indigo-400 drop-shadow-sm opacity-90" />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1.5">
                <Monitor className="w-4 h-4 text-indigo-500 opacity-70" />
                <p className="cj-stat-label mb-0 uppercase tracking-wider">Total Problems Solved</p>
              </div>
              <div className="w-5 h-0.5 bg-indigo-500 mb-3 rounded-full opacity-80 transition-all duration-300 group-hover:w-[40%]" />
              <div className="cj-stat-value tabular-nums text-foreground" style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
                {stats?.totalSolvedAllPlatforms != null ? totalSolved : "—"}
              </div>
              <p className="cj-stat-sub opacity-60">LeetCode • Codeforces • CodeChef • GeeksforGeeks</p>
            </CardContent>
          </Card>

          {/* Active Days */}
          <Card className="cj-stat-card relative group transition-all duration-300">
            <div className="absolute top-1/2 -translate-y-1/2 right-6 w-14 h-14 flex items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-inner opacity-[0.85] transition-transform duration-300 group-hover:scale-[1.05]">
              <Calendar className="w-7 h-7 text-emerald-500 dark:text-emerald-400 drop-shadow-sm opacity-90" />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1.5">
                <Flame className="w-4 h-4 text-emerald-500 opacity-70" />
                <p className="cj-stat-label mb-0 uppercase tracking-wider">Active Days</p>
              </div>
              <div className="w-5 h-0.5 bg-emerald-500 mb-3 rounded-full opacity-80 transition-all duration-300 group-hover:w-[40%]" />
              <div className="cj-stat-value tabular-nums text-foreground" style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
                {stats?.totalActiveDays != null ? activeDays : "—"}
              </div>
              <p className="cj-stat-sub opacity-60">Days with submissions</p>
            </CardContent>
          </Card>
        </div>

        {/* ── Rating Trend Charts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* LeetCode Rating History */}
          <Card className="cj-chart-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-4 h-4 text-lc-icon" />
                LeetCode Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lcChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={lcChartData} margin={{ left: 0, right: 16, top: 8, bottom: 24 }}>
                    <defs>
                      <linearGradient id="colorLc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5e6ad2" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#5e6ad2" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground)/0.04)" vertical={false} />
                    <XAxis
                      dataKey="date"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      interval={xAxisInterval(lcChartData.length)}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      domain={["auto", "auto"]}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: "hsl(var(--muted-foreground)/0.2)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                    <Area
                      type="monotone"
                      dataKey="rating"
                      stroke="#5e6ad2"
                      fillOpacity={1}
                      fill="url(#colorLc)"
                      strokeWidth={2}
                      activeDot={{ r: 4, fill: "#5e6ad2", stroke: "transparent" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[220px] flex items-center justify-center text-muted-foreground text-sm">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Codeforces Rating History */}
          <Card className="cj-chart-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-4 h-4 text-cf-icon" />
                Codeforces Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cfChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={cfChartData} margin={{ left: 0, right: 16, top: 8, bottom: 24 }}>
                    <defs>
                      <linearGradient id="colorCf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e87a36" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#e87a36" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground)/0.04)" vertical={false} />
                    <XAxis
                      dataKey="date"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      interval={xAxisInterval(cfChartData.length)}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      domain={["auto", "auto"]}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: "hsl(var(--muted-foreground)/0.2)", strokeWidth: 1, strokeDasharray: "4 4" }} />
                    <Area
                      type="monotone"
                      dataKey="rating"
                      stroke="#e87a36"
                      fillOpacity={1}
                      fill="url(#colorCf)"
                      strokeWidth={2}
                      activeDot={{ r: 4, fill: "#e87a36", stroke: "transparent" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[220px] flex items-center justify-center text-muted-foreground text-sm">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Difficulty Breakdown ── */}
        {donutData.length > 0 && (
          <div className="mb-8">
            <Card className="cj-chart-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="w-4 h-4 text-lc-icon" />
                  Problem Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6 w-full py-4">
                  {/* Metrics Row */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total (LC)</span>
                      <span className="text-3xl font-bold tracking-tight">{lc?.totalSolved ?? "—"}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 md:gap-8">
                      {donutData.map((item, i) => (
                        <div key={i} className="flex flex-col items-end">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
                          </div>
                          <span className="text-xl font-bold tabular-nums mt-0.5">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Horizontal Progress Bar */}
                  <div className="h-4 w-full bg-muted/50 rounded-full overflow-hidden flex gap-0.5">
                    {donutData.map((item, i) => {
                      const total = lc?.totalSolved || 1;
                      const width = `${(item.value / total) * 100}%`;
                      if (item.value === 0) return null;
                      return (
                        <div
                          key={i}
                          className="h-full transition-all duration-1000 ease-out hover:brightness-110 cursor-pointer"
                          style={{ width, backgroundColor: item.color }}
                          title={`${item.name}: ${item.value}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Notable Achievements ── */}
        <div className="mb-8">
          <Card className="cj-chart-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="w-4 h-4 text-yellow-500" />
                Notable Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 rounded bg-slate-100/80 dark:bg-slate-200/90 flex items-center justify-center shrink-0 mt-0.5 p-1.5 shadow-sm border border-border/50">
                    <img src="/icons/Meta_Logo.png" alt="Meta" className="w-full h-full object-contain scale-[1.2]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">Meta Hacker Cup</h4>
                      <button 
                        onClick={() => setActiveCert("/achievements/Meta_HackerCup_2025_certificate_img.png")}
                        className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Certificate
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      Global Rank 3223 (AIR 875) in Round 1 and qualified for Round 2.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 rounded bg-slate-100/80 dark:bg-slate-200/90 flex items-center justify-center shrink-0 mt-0.5 p-1 shadow-sm border border-border/50">
                    <img src="/icons/Flipkart-Logo-webp.png" alt="Flipkart" className="w-full h-full object-contain scale-[1.2]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">Flipkart Grid 7.0</h4>
                      <button 
                        onClick={() => setActiveCert("/achievements/Flipkart7.0_certificate.png")}
                        className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Certificate
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      Semi-Finalist, reaching the top 0.5% nationally among 1.5 lakh+ participants.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Coding Activity Heatmap ── */}
        <Card className="cj-chart-card mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Flame className="w-4 h-4 text-orange-400" />
              Coding Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[700px] relative" ref={heatmapRef}>
                <CalendarHeatmap
                  startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                  endDate={new Date()}
                  values={heatmapValues}
                  classForValue={(value) => {
                    if (!value || value.count === 0) return "color-empty";
                    return `color-scale-${Math.min(Math.ceil(value.count / 2), 4)}`;
                  }}
                  tooltipDataAttrs={(value) => {
                    if (!value || !value.date) return {};
                    const d = new Date(value.date);
                    const formatted = d.toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric" });
                    const c = value.count ?? 0;
                    const plural = c === 1 ? "submission" : "submissions";
                    return {
                      ["data-date"]: value.date,
                      ["data-count"]: String(c),
                      ["data-title"]: `${c} ${plural} on ${formatted}`,
                    } as any;
                  }}
                  showWeekdayLabels
                />
                {tooltip.visible && (
                  <div
                    ref={tooltipRef}
                    className="pointer-events-none z-50 rounded px-3 py-1.5 text-xs bg-card border border-border shadow-lg max-w-xs break-words"
                    style={{ position: "absolute", left: tooltip.left, top: tooltip.top }}
                  >
                    {tooltip.text}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Status Footer ── */}
        {(stats?.codechef || stats?.gfg) && (
          <div className="flex flex-col items-center justify-center gap-1.5 text-center mt-12 text-[13.5px] leading-relaxed text-[#4B5563] dark:text-[#9CA3AF] font-normal">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse flex-shrink-0" />
              <span>
                Active also on{" "}
                <a
                  href={`https://www.codechef.com/users/${CC_USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#374151] dark:text-[#E5E7EB] hover:text-primary transition-colors underline underline-offset-2"
                >
                  CodeChef
                </a>
                {stats.codechef?.stars && ` (${stats.codechef.stars}`}
                {stats.codechef?.maxRating != null && `, peak rating ${stats.codechef.maxRating}`}
                {stats.codechef?.contestsCount != null && `, ${stats.codechef.contestsCount} contests`}
                {(stats.codechef?.stars || stats.codechef?.maxRating != null) && ")"}
                {stats.gfg?.totalSolved != null && (
                  <>
                    {" "}and{" "}
                    <a
                      href={`https://www.geeksforgeeks.org/user/${GFG_USER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#374151] dark:text-[#E5E7EB] hover:text-primary transition-colors underline underline-offset-2"
                    >
                      GeeksforGeeks
                    </a>
                    {` (${stats.gfg.totalSolved}+ solved)`}
                  </>
                )}
              </span>
            </div>
            <div className="text-[#9CA3AF] dark:text-[#6B7280] text-[12px] font-normal">
              Last auto-synced {fmtRelative(stats?.lastUpdated ?? null)}
            </div>
          </div>
        )}
      </div>

      {/* ── Fullscreen Certificate Modal ── */}
      {activeCert && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActiveCert(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveCert(null); }}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Close certificate"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={activeCert} 
              alt="Achievement Certificate" 
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

      {/* ── Scoped styles ── */}
      <style>{`
        /* Stat cards */
        .cj-stat-card {
          border-color: hsl(var(--border) / 0.5);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .cj-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border-color: #0D1117 !important;
        }
        .dark .cj-stat-card:hover {
          border-color: #ffffff !important;
          box-shadow: 0 12px 25px -5px rgba(255, 255, 255, 0.05), 0 8px 10px -6px rgba(255, 255, 255, 0.02);
        }
        .cj-stat-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .cj-stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: hsl(var(--foreground));
          margin-bottom: 0.35rem;
          tabular-nums: all;
          font-variant-numeric: tabular-nums;
        }
        .cj-stat-sub {
          font-size: 0.8rem;
          color: hsl(var(--muted-foreground));
        }

        /* Accent colors */
        .text-lc { color: #5e6ad2; }
        .text-cf { color: #e87a36; }
        .text-lc-icon { color: #5e6ad2; }
        .text-cf-icon { color: #e87a36; }

        /* Chart cards */
        .cj-chart-card {
          background-color: hsl(var(--card) / 0.4);
          border-color: hsl(var(--border) / 0.3);
          backdrop-filter: blur(8px);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .cj-chart-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        .dark .cj-chart-card:hover {
          box-shadow: 0 12px 25px -5px rgba(255, 255, 255, 0.05), 0 8px 10px -6px rgba(255, 255, 255, 0.02);
        }

        /* Chart tooltip */
        .cj-tooltip {
          background: hsl(var(--card) / 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid hsl(var(--border) / 0.4);
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 0.8rem;
          box-shadow: 0 8px 24px -6px hsl(0 0% 0% / 0.2);
        }
        .cj-tooltip-label {
          color: hsl(var(--muted-foreground));
          font-size: 0.72rem;
          margin-bottom: 2px;
        }
        .cj-tooltip-value {
          color: hsl(var(--foreground));
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Heatmap cell colors — blue accent, dual-mode */
        .react-calendar-heatmap .color-empty {
          fill: hsl(var(--muted) / 0.25);
        }
        .react-calendar-heatmap .color-scale-1 {
          fill: hsl(213 94% 68% / 0.25);
        }
        .react-calendar-heatmap .color-scale-2 {
          fill: hsl(213 94% 68% / 0.5);
        }
        .react-calendar-heatmap .color-scale-3 {
          fill: hsl(213 94% 68% / 0.75);
        }
        .react-calendar-heatmap .color-scale-4 {
          fill: hsl(213 94% 68%);
        }
        .react-calendar-heatmap text {
          fill: hsl(var(--muted-foreground));
          font-size: 10px;
        }
        .react-calendar-heatmap rect:hover {
          stroke: hsl(213 94% 68%);
          stroke-width: 2px;
        }

        /* Light mode: slightly more saturated */
        :root .react-calendar-heatmap .color-scale-4 {
          fill: hsl(213 80% 55%);
        }
        .dark .react-calendar-heatmap .color-scale-4 {
          fill: hsl(213 94% 65%);
        }
      `}</style>
    </section>
  );
};

export default CodingDashboard;
