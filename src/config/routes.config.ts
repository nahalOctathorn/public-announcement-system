export const ROOT_ROUTE = "/";
export type RootRoute = keyof typeof ROOT_ROUTE;
export const PUBLIC_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  RESET_PASSWORD: "/reset-password",
  FORGOT_PASSWORD: "/forgot-password",
} as const;
export type PublicRoute = keyof typeof PUBLIC_ROUTES;
export const ADMIN_ROUTES = {
  DASHBOARD: "/dashboard",
  DEVICES: "/devices",
  SCHEDULE: "/schedule",
  SOS_ALERTS: "/sos-alerts",
  ANNOUNCEMENTS: "/announcements",
  ZONES_LOCATIONS: "/zones",
  AUDIOS: "/audios",
} as const;
export type AdminRoute = keyof typeof ADMIN_ROUTES;
export const COMMON_ROUTES = {
  NOT_FOUND: "*",
} as const;
export type CommonRoute = keyof typeof COMMON_ROUTES;