/**
 * PostHog Analytics Stealth Configuration
 *
 * Implements ad-blocker evasion via first-party reverse proxy
 * and developer visit exclusion for 100% data purity.
 */
export const ANALYTICS_CONFIG = {
  // Public client API key resolved from environment variables or safe client fallback
  apiKey: import.meta.env.VITE_POSTHOG_KEY || "phc_sJiZiJM5puqdjrmX6uXGBno6ay7rDB6ozQS6gpj7FQjf",

  // Stealth reverse proxy path routing through our domain (bypasses uBlock/DNS sinkholes)
  apiHost: "/status-of-user-response",
  uiHost: "https://us.posthog.com",

  // Developer opt-out localStorage flag
  ignoreMetricsKey: "ignore_metrics",
};

