export enum UnAuthorizedRoute {
  Login = '/login',
  Register = '/register',
}
export enum AuthorizedRoute {
  Dashboard = '/dashboard',
  Profile = '/dashboard/user',
}
export enum CommonRoutes {
  Home = '/',
}

export const ApiRoutes = {
  Register: '/api/register',
  Login: '/api/login',
  User: (id: string) => `/api/user/${id}`,
};
