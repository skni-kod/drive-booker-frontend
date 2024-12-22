import { withAuth } from 'next-auth/middleware';
import { AuthorizedRoute } from './enums/routes.enums';

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (
        req.nextUrl.pathname.startsWith(AuthorizedRoute.Dashboard) &&
        token === null
      ) {
        return false;
      }
      return true;
    },
  },
});
