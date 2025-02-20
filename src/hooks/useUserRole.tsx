import { getUserRoles } from '@/actions/getUserRole';
import { useEffect, useState } from 'react';

export function useUserRole() {
  const [roles, setRole] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const fetchedRoles = await getUserRoles();
      setRole(fetchedRoles);
    };

    fetchRole();
  }, []);

  return roles;
}
