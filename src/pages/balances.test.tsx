import React from 'react';

import {
  renderWithAllProviders,
  rest,
  setupMockServer,
  userEvent,
} from '@shieldpay/wheeljack/testing';

import { apiRoutes, BASE_URL } from '../hooks/config';

import { BalancesPage } from './balances';

const partnersWithData = {
  pagination: {
    limit: 30,
    pageSize: 30,
    offset: 60,
    total: 2,
    next: '/v1/partners?limit=30&offset=60',
    prev: '/v1/partners?limit=30&offset=0',
  },
  filters: {},
  partners: [
    {
      alias: '507da776-6550-487d-bd38-159919006995',
      fullLegalName: 'Smitts Steaks',
    },
    {
      alias: '507da776-6550-487d-bd78-159912006996',
      fullLegalName: 'Smitts Strawberries',
    },
  ],
};

const placeholder = 'Partners...';

describe('Partners page with partners data', () => {
  setupMockServer([
    rest.get(`${BASE_URL}${apiRoutes.partners}`, (req, res, ctx) => {
      return res(ctx.json(partnersWithData));
    }),
  ]);

  it('Displays initial state with partners table', async () => {
    const {
      findByRole,
      queryByText,
      getByText,
      findByText,
    } = renderWithAllProviders(<BalancesPage />);

    expect(
      await findByRole('heading', { name: 'Balances' }),
    ).toBeInTheDocument();

    expect(await queryByText('All partners')).not.toBeVisible();

    const button = getByText(placeholder);

    userEvent.click(button);

    expect(getByText('Smitts Steaks')).toBeVisible();
    expect(getByText('Smitts Strawberries')).toBeVisible();
  });
});
