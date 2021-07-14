import React from 'react';

import { render } from '@shieldpay/wheeljack/testing';

import { DashboardLayout } from './dashboard-layout';

describe('<DashboardLayout />', () => {
  it('Tells the user they are logged in', () => {
    const { queryByRole, queryAllByRole } = render(
      <DashboardLayout>
        <></>
      </DashboardLayout>,
    );

    // four links - two to dashboard (one is Paycast logo)
    expect(queryAllByRole('link')).toHaveLength(4);

    expect(queryByRole('link', { name: 'Paycast' })).toBeInTheDocument();
    expect(queryByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(queryByRole('link', { name: 'Balances' })).toBeInTheDocument();
    expect(queryByRole('link', { name: 'Partners' })).toBeInTheDocument();
  });
});
