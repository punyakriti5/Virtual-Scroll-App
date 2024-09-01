import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import VirtualScroll from './VirtualScroll';

// Mock the modules
jest.mock('axios');
jest.mock('react-window', () => ({
  FixedSizeList: ({ children, itemCount }) => (
    <div data-testid="virtual-list">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index}>{children({ index, style: {} })}</div>
      ))}
    </div>
  ),
}));
jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({ height: 600, width: 400 }));

describe('VirtualScroll', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: Array.from({ length: 100 }, (_, i) => ({ name: `Item ${i + 1}` }))
    });
  });

  it('renders items after loading', async () => {
    render(<VirtualScroll />);

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('renders virtual list', async () => {
    render(<VirtualScroll />);

    await waitFor(() => {
      expect(screen.getByTestId('virtual-list')).toBeInTheDocument();
    });
  });
});
