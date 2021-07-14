import React from 'react';

import { render } from '@shieldpay/wheeljack/testing';

import { PartnersPage } from './partners';

describe('Partners page', () => {
  it('Displays initial state', () => {
    const { queryByRole } = render(<PartnersPage />);

    expect(queryByRole('heading', { name: 'Partners' })).toBeInTheDocument();

    expect(queryByRole('link', { name: 'Create partner' })).toHaveAttribute(
      'href',
      '/partners/create-partner',
    );
  });
});
