export enum UnAuthorizedRoute {
  Login = '/login',
  Register = '/register',
}

export enum AuthorizedRoute {
  Dashboard = '/dashboard',
  Profile = '/dashboard/user',
  FillProfile = '/dashboard/fill-profile',
}

export enum CommonRoutes {
  Home = '/',
}

export enum AdminRoutes {
  Panel = '/adminpanel',
}

export enum ApiRoutes {
  Register = '/api/register',
  Login = '/api/login',
  Google = '/api/login/google',
}

export enum AdminPanelApiRoutes {
  Drivers = '/api/admin/students',
  Course_Registrations = '/api/admin/course_registrations',
}
