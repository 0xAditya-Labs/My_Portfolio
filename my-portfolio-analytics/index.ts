import posthog from "posthog-js";
import { ANALYTICS_CONFIG } from "./config";
import { setupGlobalTelemetry, registerTrafficSource } from "./tracker";

/**
 * Self-initializing stealth telemetry package for Aditya Chauhan Portfolio.
 *
 * Guarantees:
 * 1. 0ms blocking on initial render or main-thread navigation.
 * 2. 100% ad-blocker evasion via Vercel Edge reverse proxy.
 * 3. 100% data purity: completely aborts if developer opt-out is enabled.
 * 4. Zero pollution of application UI components.
 */
function initializeAnalytics(): void {
  if (typeof window === "undefined") return;

  // 1. Gatekeeper Check: Abort if developer opted out
  try {
    if (localStorage.getItem(ANALYTICS_CONFIG.ignoreMetricsKey) === "true") {
      return;
    }
  } catch {
    // Graceful fallback for restricted environments
  }

  const apiKey = ANALYTICS_CONFIG.apiKey;
  if (!apiKey) {
    return;
  }

  // 2. Initialize PostHog via stealth first-party reverse proxy
  posthog.init(apiKey, {
    api_host: ANALYTICS_CONFIG.apiHost,
    ui_host: ANALYTICS_CONFIG.uiHost,
    person_profiles: "identified_only",
    capture_pageview: false, // Managed by our decoupled SPA History observer
    capture_pageleave: true, // Captures time-on-page & exit via sendBeacon
    autocapture: true, // Tracks interactions & DOM events
    disable_session_recording: false,
    loaded: () => {
      // 3. Register traffic source & mount global telemetry listeners
      registerTrafficSource();
      setupGlobalTelemetry();
    },
  });
}

// Auto-run on load
initializeAnalytics();

export { trackOutboundClick, trackProjectCardOpened, trackAIPrompt } from "./tracker";

