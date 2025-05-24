import { describe, expect, it, vi } from 'vitest';
import { RoleGuard } from './RoleGuard';

vi.mock('@/actions/checkUserRole', () => ({
  checkUserRole: async () => ({
    hasRole: (allowedRoles: string[]) => allowedRoles.includes('admin'),
  }),
}));

describe('RoleGuard', () => {
  it('renders children if hasRole returns true', async () => {
    const allowedRoles = ['admin'];
    const children = <div>Allowed Content</div>;

    const result = await RoleGuard({ allowedRoles, children });
    expect(result).toBeDefined();
  });

  it('does not render children if hasRole returns false', async () => {
    const allowedRoles = ['user']; // 'user' not included in hardcoded hasRole
    const children = <div>Allowed Content</div>;

    const result = await RoleGuard({ allowedRoles, children });

    expect(result).toBeUndefined(); // RoleGuard should return undefined if wrong role
  });
});
