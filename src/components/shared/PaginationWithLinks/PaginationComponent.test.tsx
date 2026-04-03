import {
  mockPush,
  setupNextNavigationMock,
} from '@/lib/tests/mocks/nextNavigationMock';
import { render, screen } from '@testing-library/react';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import { PaginationWithLinks } from './PaginationComponent';

setupNextNavigationMock();

describe('PaginationComponent', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('renders the pagination component', () => {
    render(<PaginationWithLinks totalCount={20} pageSize={10} page={1} />);
    // Check that the container or root element of pagination is present
    const pagination = screen.getByRole('navigation', { name: /pagination/i });
    expect(pagination).toBeInTheDocument();
  });

  it('renders correct number of pages when totalPageCount <= 5', () => {
    vi.mocked(usePathname).mockReturnValue('/trainings');
    render(<PaginationWithLinks totalCount={40} pageSize={10} page={1} />);

    // should render pages 1 to 4
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('calculates total pages correctly', () => {
    vi.mocked(usePathname).mockReturnValue('/list');
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams() as ReadonlyURLSearchParams,
    );

    render(<PaginationWithLinks totalCount={95} pageSize={10} page={1} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('navigates to next and previous page with correct link', () => {
    vi.mocked(usePathname).mockReturnValue('/items');

    render(<PaginationWithLinks totalCount={100} pageSize={10} page={2} />);
    expect(screen.getByRole('link', { name: /previous/i })).toHaveAttribute(
      'href',
      '/items?page=1',
    );
    expect(screen.getByRole('link', { name: /next/i })).toHaveAttribute(
      'href',
      '/items?page=3',
    );
  });

  it('highlights current page as active', () => {
    vi.mocked(usePathname).mockReturnValue('/active');

    render(<PaginationWithLinks totalCount={30} pageSize={10} page={2} />);

    const activePage = screen.getByText('2');
    expect(activePage).toHaveAttribute('aria-current', 'page');
  });

  it('renders ellipsis when page count is large', () => {
    render(<PaginationWithLinks totalCount={100} pageSize={10} page={5} />);
    const ellipsisIcon = screen.getAllByTestId('pagination-ellipsis-icon');
    expect(ellipsisIcon.length).toBeGreaterThan(0);
  });

  it('renders correctly when on the last page', () => {
    vi.mocked(usePathname).mockReturnValue('/last');

    render(<PaginationWithLinks totalCount={50} pageSize={10} page={5} />);

    // Should not render "Next" button since we're on the last page
    expect(screen.getByRole('link', { name: /next/i })).toHaveAttribute(
      'aria-disabled',
      'true',
    );

    // Should render "Previous" with link to page 4
    expect(screen.getByRole('link', { name: /previous/i })).toHaveAttribute(
      'href',
      '/last?page=4',
    );
  });

  it('renders correctly when on the first page', () => {
    vi.mocked(usePathname).mockReturnValue('/first');

    render(<PaginationWithLinks totalCount={50} pageSize={10} page={1} />);

    // Should not render "Previous" since it's the first page
    expect(screen.getByRole('link', { name: /previous/i })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    // Should render "Next" with link to page 2
    expect(screen.getByRole('link', { name: /next/i })).toHaveAttribute(
      'href',
      '/first?page=2',
    );
  });

  it('renders correctly when page is greater than totalPageCount', () => {
    vi.mocked(usePathname).mockReturnValue('/overflow');

    // totalPageCount = 3, current page is 5
    render(<PaginationWithLinks totalCount={3} pageSize={10} page={5} />);

    // Should not render any page links, or should gracefully fallback
    expect(screen.queryByText('5')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
