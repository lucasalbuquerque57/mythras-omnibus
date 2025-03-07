

/**
 * An array of routes that ARE accessible to EVERYONE.
 * They do not require any authentication.
 * @type {string[]}
*/

export const publicRoutes = [
    '/',
    '/auth/new-verification',
];
/*new-verification is not included in authRoutes because it might be used in the settings to reset email

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged-in users to /settings.
 * @type {string[]}
*/

export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset'
];


/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
*/

export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in.
 * @type {string}
*/

export const DEFAULT_LOGIN_REDIRECT = '/settings';