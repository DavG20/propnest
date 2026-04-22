import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'am'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewriteDefault',
});

export default function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  // Match all pathnames except static files and API routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/'],
};
