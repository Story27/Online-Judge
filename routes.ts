/**
 * An array of routes accessible to publicRoutes
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes accessible to authentication
 * These routes will redirect user to /settings
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "https://algoarena.me/";
