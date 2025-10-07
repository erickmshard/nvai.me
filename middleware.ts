import intlMiddleware from './middlewares/intlMiddleware';

export default function middleware(request: Parameters<typeof intlMiddleware>[0]) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
