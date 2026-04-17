/**
 * TEIKOS web app entry points (signup / login).
 * Set `VITE_APP_SIGNUP_URL` and `VITE_APP_LOGIN_URL` in `.env`, then restart the dev server.
 * Until set, links fall back to `#` so the UI still renders.
 */
function envUrl(key: string): string {
  const raw = import.meta.env[key] as string | undefined;
  const t = raw?.trim();
  return t && t.length > 0 ? t : '#';
}

export const APP_SIGNUP_URL = envUrl('VITE_APP_SIGNUP_URL');
export const APP_LOGIN_URL = envUrl('VITE_APP_LOGIN_URL');
