import { ReadonlyURLSearchParams } from 'next/navigation';
import { vi } from 'vitest';

export const mockPush = vi.fn();

export function setupNextNavigationMock() {
  vi.mock('next/navigation', async () => {
    const actual =
      await vi.importActual<typeof import('next/navigation')>(
        'next/navigation',
      );
    return {
      ...actual,
      usePathname: vi.fn().mockReturnValue('/default'),
      useSearchParams: vi
        .fn()
        .mockReturnValue(
          new URLSearchParams() as unknown as ReadonlyURLSearchParams,
        ),
      useRouter: vi.fn(() => ({
        push: mockPush,
      })),
    };
  });
}
