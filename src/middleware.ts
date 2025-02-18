import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./i18n/navigation";

export default createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next (Next.js internals)
  // - /static (inside /public)
  // - /_vercel (Vercel internals)
  // - all files inside /public (e.g. /favicon.ico)
  matcher: ["/", "/(en|fr|es|ar)/:path*"],
};
