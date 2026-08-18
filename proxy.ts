/**
 * Next.js 16 prefers proxy.ts over middleware.ts. We keep the same next-intl
 * middleware configuration here because it is the supported migration target.
 */
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(es|en)/:path*"],
};
