import posthog from "posthog-js";
import { ANALYTICS_CONFIG } from "./config";

/**
 * Synchronous in-memory detection of referrer, traffic channel, and campaigns.
 * Runtime: <0.01ms (pure string/URL parsing, 0 network requests, 0 latency).
 */
export function getTrafficSourceInfo(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const referrer = document.referrer || "";
  let referringDomain = "";
  if (referrer) {
    try {
      referringDomain = new URL(referrer).hostname.toLowerCase();
    } catch {
      referringDomain = "";
    }
  }

  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    params = new URLSearchParams();
  }

  const utmSource = (params.get("utm_source") || params.get("source") || "").toLowerCase();
  const utmMedium = (params.get("utm_medium") || params.get("medium") || "").toLowerCase();
  const utmCampaign = params.get("utm_campaign") || params.get("campaign") || "";
  const utmContent = (params.get("utm_content") || "").toLowerCase();
  const refParam = (params.get("ref") || "").toLowerCase();

  let trafficChannel = "Direct";
  let trafficSource = "Direct";
  let trafficMedium = "direct";

  const isBio =
    utmMedium === "bio" ||
    utmContent === "bio" ||
    refParam === "bio" ||
    refParam === "twitter_bio" ||
    refParam === "x_bio";

  const isPost =
    utmMedium === "post" ||
    utmMedium === "tweet" ||
    refParam === "post" ||
    refParam === "tweet";

  // 1. Explicit campaign or ref query parameters (e.g. ?ref=bio or ?utm_source=twitter&utm_medium=bio)
  if (utmSource || refParam) {
    if (
      utmSource.includes("twitter") ||
      utmSource === "x" ||
      refParam.includes("twitter") ||
      refParam.includes("x")
    ) {
      trafficChannel = "Social";
      trafficSource = "Twitter / X";
      trafficMedium = isBio ? "bio" : isPost ? "post" : (utmMedium || "social_feed");
    } else if (utmSource.includes("linkedin") || refParam.includes("linkedin")) {
      trafficChannel = "Social";
      trafficSource = "LinkedIn";
      trafficMedium = isBio ? "bio" : isPost ? "post" : (utmMedium || "post");
    } else if (utmSource.includes("github") || refParam.includes("github")) {
      trafficChannel = "Developer Community";
      trafficSource = "GitHub";
      trafficMedium = utmMedium || "profile";
    } else if (utmSource.includes("google")) {
      trafficChannel = "Organic Search";
      trafficSource = "Google";
      trafficMedium = utmMedium || "search";
    } else {
      trafficChannel = "Campaign";
      trafficSource = utmSource || refParam;
      trafficMedium = utmMedium || "custom";
    }
  } else if (referringDomain) {
    // 2. Classify by HTTP Referrer domain
    if (referringDomain.includes("google.")) {
      trafficChannel = "Organic Search";
      trafficSource = "Google Search";
      trafficMedium = "organic_search";
    } else if (referringDomain.includes("bing.") || referringDomain.includes("duckduckgo.")) {
      trafficChannel = "Organic Search";
      trafficSource = referringDomain.replace("www.", "");
      trafficMedium = "organic_search";
    } else if (
      referringDomain === "t.co" ||
      referringDomain.includes("twitter.") ||
      referringDomain.includes("x.com")
    ) {
      trafficChannel = "Social";
      trafficSource = "Twitter / X";
      trafficMedium = isBio ? "bio" : "post_or_feed";
    } else if (referringDomain.includes("linkedin.")) {
      trafficChannel = "Social";
      trafficSource = "LinkedIn";
      trafficMedium = isBio ? "bio" : "post_or_feed";
    } else if (referringDomain.includes("github.")) {
      trafficChannel = "Developer Community";
      trafficSource = "GitHub";
      trafficMedium = "referral";
    } else if (referringDomain.includes("leetcode.")) {
      trafficChannel = "Developer Community";
      trafficSource = "LeetCode";
      trafficMedium = "referral";
    } else if (referringDomain.includes("codeforces.")) {
      trafficChannel = "Developer Community";
      trafficSource = "Codeforces";
      trafficMedium = "referral";
    } else if (referringDomain.includes("reddit.")) {
      trafficChannel = "Social";
      trafficSource = "Reddit";
      trafficMedium = "social_post";
    } else if (referringDomain.includes("youtube.")) {
      trafficChannel = "Social";
      trafficSource = "YouTube";
      trafficMedium = "video_description";
    } else {
      trafficChannel = "Referral";
      trafficSource = referringDomain.replace("www.", "");
      trafficMedium = "external_link";
    }
  }

  // Instant local timezone & language (0ms synchronous lookup)
  let visitorTimezone = "unknown";
  try {
    visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
  } catch {
    // Fallback
  }

  return {
    traffic_channel: trafficChannel,
    traffic_source: trafficSource,
    traffic_medium: trafficMedium,
    referring_domain: referringDomain || "direct",
    referrer_url: referrer || "direct",
    visitor_timezone: visitorTimezone,
    visitor_language: typeof navigator !== "undefined" ? navigator.language : "unknown",
    ...(utmCampaign ? { utm_campaign: utmCampaign } : {}),
    ...(utmSource ? { utm_source: utmSource } : {}),
    ...(utmMedium ? { utm_medium: utmMedium } : {}),
    ...(refParam ? { ref_tag: refParam } : {}),
  };
}

/**
 * Registers traffic source and timezone as persistent super properties in PostHog.
 * Every single subsequent event automatically inherits these properties.
 */
export function registerTrafficSource(): void {
  try {
    const trafficInfo = getTrafficSourceInfo();
    posthog.register(trafficInfo);
  } catch {
    // Non-blocking
  }
}

/**
 * Checks if tracking is permitted (not in developer opt-out, PostHog loaded)
 */
export function isTrackingPermitted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(ANALYTICS_CONFIG.ignoreMetricsKey) === "true") {
      return false;
    }
  } catch {
    // Graceful fallback for restricted storage environments
  }
  return Boolean(posthog.__loaded);
}

/**
 * Core non-blocking event dispatcher
 */
export function safeCapture(eventName: string, properties?: Record<string, any>): void {
  try {
    if (!isTrackingPermitted()) return;
    posthog.capture(eventName, properties);
  } catch {
    // Non-blocking: analytics should never interrupt the user experience
  }
}

/**
 * Classifies an outbound URL into a platform and category
 */
export function classifyUrl(url: string, linkText = ""): { platform: string; category: string } {
  const lower = url.toLowerCase();
  const textLower = linkText.toLowerCase();

  if (
    lower.includes("resume") ||
    textLower.includes("resume") ||
    (lower.includes("drive.google.com") && lower.includes("12e7e1ekxwteve"))
  ) {
    return { platform: "resume", category: "resume" };
  }
  if (lower.includes("linkedin.com")) return { platform: "linkedin", category: "social" };
  if (lower.includes("github.com")) return { platform: "github", category: "developer" };
  if (lower.includes("x.com") || lower.includes("twitter.com")) return { platform: "x_twitter", category: "social" };
  if (lower.startsWith("mailto:")) return { platform: "email", category: "contact" };
  if (lower.includes("tally.so")) return { platform: "tally_form", category: "contact" };

  if (lower.includes("leetcode.com")) return { platform: "leetcode", category: "competitive_programming" };
  if (lower.includes("codeforces.com")) return { platform: "codeforces", category: "competitive_programming" };
  if (lower.includes("codechef.com")) return { platform: "codechef", category: "competitive_programming" };
  if (lower.includes("geeksforgeeks.org")) return { platform: "geeksforgeeks", category: "competitive_programming" };

  return { platform: "other", category: "outbound_link" };
}

/**
 * Tracks an outbound navigation or external resource click
 */
export function trackOutboundClick(url: string, meta?: Record<string, any>): void {
  const { platform, category } = classifyUrl(url, meta?.link_text || "");

  const properties = {
    destination_url: url,
    platform,
    link_category: category,
    link_text: meta?.link_text || "",
    ...meta,
  };

  // Primary aggregate event
  safeCapture("outbound_click", properties);

  // Dedicated 1-click filter events for PostHog dashboards & funnels
  if (platform === "resume") {
    safeCapture("resume_clicked", { destination_url: url, ...meta });
  } else if (platform === "linkedin") {
    safeCapture("linkedin_clicked", { destination_url: url, ...meta });
  } else if (platform === "github") {
    safeCapture("github_clicked", { destination_url: url, ...meta });
  } else if (platform === "x_twitter") {
    safeCapture("x_twitter_clicked", { destination_url: url, ...meta });
  } else if (platform === "email") {
    safeCapture("email_clicked", { destination_url: url, ...meta });
  } else if (platform === "tally_form") {
    safeCapture("tally_form_clicked", { destination_url: url, ...meta });
  } else if (category === "competitive_programming") {
    safeCapture("cp_profile_clicked", { platform, destination_url: url, ...meta });
  }
}

/**
 * Tracks when a user opens a project card
 */
export function trackProjectCardOpened(title: string, meta?: Record<string, any>): void {
  safeCapture("project_card_opened", {
    project_title: title,
    ...meta,
  });
}

/**
 * Tracks when a user submits a prompt to the AI search
 */
export function trackAIPrompt(prompt: string, meta?: Record<string, any>): void {
  const clean = prompt.trim();
  if (!clean || clean.length < 2) return;

  safeCapture("ai_prompt_asked", {
    prompt: clean,
    prompt_length: clean.length,
    source: meta?.source || "command_palette",
    ...meta,
  });
}

let isTelemetryInitialized = false;

/**
 * Installs non-blocking global listeners with 0ms performance impact (idempotent)
 */
export function setupGlobalTelemetry(): void {
  if (typeof window === "undefined" || !isTrackingPermitted()) return;
  if (isTelemetryInitialized) return;
  isTelemetryInitialized = true;

  // Register persistent traffic source properties
  registerTrafficSource();

  // 1. SPA Pageview Listener (History API monkey-patching)
  let lastCapturedUrl = "";
  const captureSPAView = () => {
    try {
      const currentUrl = window.location.href;
      if (currentUrl === lastCapturedUrl) return;
      lastCapturedUrl = currentUrl;

      safeCapture("$pageview", {
        $current_url: currentUrl,
        pathname: window.location.pathname,
        ...getTrafficSourceInfo(),
      });
    } catch {
      // Non-blocking
    }
  };

  // Capture initial pageview
  captureSPAView();

  // Intercept history.pushState & replaceState
  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    const res = originalPushState.apply(this, args);
    setTimeout(captureSPAView, 0);
    return res;
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function (...args) {
    const res = originalReplaceState.apply(this, args);
    setTimeout(captureSPAView, 0);
    return res;
  };

  window.addEventListener("popstate", captureSPAView, { passive: true });
  window.addEventListener("hashchange", captureSPAView, { passive: true });

  // 2. Global Passive Click Listener (Event Delegation)
  document.addEventListener(
    "click",
    (event) => {
      try {
        const target = event.target as HTMLElement | null;
        if (!target) return;

        // Check A: Native <a> links
        const anchor = target.closest("a");
        if (anchor) {
          const href = anchor.getAttribute("href");
          if (href && !href.startsWith("#") && !href.startsWith("javascript:")) {
            const currentHost = window.location.host;
            let isExternal = false;
            try {
              const parsed = new URL(anchor.href);
              isExternal = parsed.host !== currentHost;
            } catch {
              isExternal = false;
            }

            const isMailto = href.startsWith("mailto:");
            const isTel = href.startsWith("tel:");
            const isResume = href.toLowerCase().includes("resume");

            if (isExternal || isMailto || isTel || isResume) {
              const linkText = (
                anchor.innerText ||
                anchor.getAttribute("aria-label") ||
                anchor.getAttribute("title") ||
                ""
              ).trim();

              trackOutboundClick(anchor.href || href, {
                link_text: linkText.slice(0, 60),
              });
              return;
            }
          }
        }

        // Check B: Resume buttons (like Hero or Command Palette buttons)
        const button = target.closest("button");
        if (button) {
          const buttonText = (
            button.innerText ||
            button.getAttribute("aria-label") ||
            button.getAttribute("title") ||
            ""
          ).trim();

          if (buttonText.toLowerCase().includes("resume")) {
            trackOutboundClick("https://drive.google.com/file/d/12E7e1ekxWTeVEhGxGmEuJIaZjH-E4Ht5/view?usp=sharing", {
              link_text: buttonText,
              platform: "resume",
              link_category: "resume",
            });
            return;
          }
        }

        // Check C: Project Cards in grid
        const projectCard = target.closest(".premium-card") || target.closest("[role='button']");
        if (projectCard && projectCard.closest("#projects")) {
          const titleElement = projectCard.querySelector("h3");
          const title = titleElement?.innerText?.trim();
          if (title) {
            const category = projectCard.querySelector("span")?.innerText?.trim() || "";
            trackProjectCardOpened(title, { category });
          }
        }
      } catch {
        // Non-blocking
      }
    },
    { capture: true, passive: true }
  );

  // 3. AI Search Prompt Listener (Command Palette)
  let promptDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  let lastCapturedPrompt = "";

  const handleAIInput = (e: Event) => {
    try {
      const input = e.target as HTMLInputElement | null;
      if (!input) return;

      const placeholder = (input.placeholder || "").toLowerCase();
      const isCommandInput =
        input.hasAttribute("cmdk-input") ||
        placeholder.includes("ai") ||
        placeholder.includes("command") ||
        placeholder.includes("ask");

      if (!isCommandInput) return;

      const value = input.value.trim();
      if (!value || value === lastCapturedPrompt || value.length < 3 || value.startsWith("!")) {
        return;
      }

      if (promptDebounceTimer) clearTimeout(promptDebounceTimer);

      // Debounce by 1.6s (coinciding with the AI search debounce)
      promptDebounceTimer = setTimeout(() => {
        lastCapturedPrompt = value;
        trackAIPrompt(value, { source: "command_palette" });
      }, 1600);
    } catch {
      // Non-blocking
    }
  };

  const handleAIKeydown = (e: KeyboardEvent) => {
    try {
      if (e.key !== "Enter") return;
      const input = e.target as HTMLInputElement | null;
      if (!input) return;

      const placeholder = (input.placeholder || "").toLowerCase();
      const isCommandInput =
        input.hasAttribute("cmdk-input") ||
        placeholder.includes("ai") ||
        placeholder.includes("command") ||
        placeholder.includes("ask");

      if (!isCommandInput) return;

      const value = input.value.trim();
      if (!value || value === lastCapturedPrompt || value.length < 2 || value.startsWith("!")) {
        return;
      }

      if (promptDebounceTimer) clearTimeout(promptDebounceTimer);
      lastCapturedPrompt = value;
      trackAIPrompt(value, { source: "command_palette" });
    } catch {
      // Non-blocking
    }
  };

  document.addEventListener("input", handleAIInput, { capture: true, passive: true });
  document.addEventListener("keydown", handleAIKeydown, { capture: true, passive: true });
}

