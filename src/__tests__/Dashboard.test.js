import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Dashboard from '../components/Dashboard';

jest.mock('axios');

describe('Financial Dashboard', () => {
  test('displays total portfolio value', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Growth Portfolio', value: 15000 },
        { id: 2, name: 'Income Portfolio', value: 10000 }
      ]
    });
    render(<Dashboard />);

    await waitFor(() => expect(screen.getByText(/Total Portfolio Value: \$25000/)).toBeInTheDocument());
  });

  test('renders Doughnut chart with correct data', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Growth Portfolio', value: 15000 },
        { id: 2, name: 'Income Portfolio', value: 10000 }
      ]
    });
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Growth Portfolio')).toBeInTheDocument();
      expect(screen.getByText('Income Portfolio')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    render(<Dashboard />);

    await waitFor(() => expect(screen.queryByText(/Total Portfolio Value/)).not.toBeInTheDocument());
  });
});