import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders Pending badge with Clock icon', () => {
    render(<StatusBadge status='pending' />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByTestId('icon-pending')).toBeInTheDocument();
  });

  it('renders Accepted badge with Check icon', () => {
    render(<StatusBadge status='accepted' />);
    expect(screen.getByText('Accepted')).toBeInTheDocument();
    expect(screen.getByTestId('icon-accepted')).toBeInTheDocument();
  });

  it('renders Rejected badge with X icon', () => {
    render(<StatusBadge status='rejected' />);
    expect(screen.getByText('Rejected')).toBeInTheDocument();
    expect(screen.getByTestId('icon-rejected')).toBeInTheDocument();
  });

  it('renders nothing for unknown status', () => {
    const { container } = render(<StatusBadge status='unknown' />);
    expect(container).toBeEmptyDOMElement();
  });
});
