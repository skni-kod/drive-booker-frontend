import { checkUserRole } from '@/actions/checkUserRole';

export const RoleGuard = async ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) => {
  const { hasRole } = await checkUserRole();

  if (!hasRole(allowedRoles)) {
    return;
  }

  return <>{children}</>;
};
