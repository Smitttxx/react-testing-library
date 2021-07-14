import React from 'react';

import { render } from '@shieldpay/wheeljack/testing';

import { DashboardPage } from './dashboard';

jest.mock('@shieldpay/authentication-ui', () => ({
  useAuthenticatedUser: () => ({
    user: {
      email: 'rick.astley@shieldpay.com',
    },
  }),
}));

describe('Dashboard page', () => {
  it('Displays initial state', () => {
    const { queryByRole, queryByText } = render(<DashboardPage />);

    expect(queryByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();

    expect(
      queryByText('Logged in as rick.astley@shieldpay.com'),
    ).toBeInTheDocument();
  });
});
