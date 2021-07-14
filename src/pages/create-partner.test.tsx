import React from 'react';

import { render } from '@shieldpay/wheeljack/testing';

import { CreatePartnerPage } from './create-partner';

describe('Create Partner page', () => {
  it('Renders initial state', async () => {
    const { findByRole, findByText, findAllByText, findByLabelText } = render(
      <CreatePartnerPage />,
    );

    expect(await findByRole('link', { name: 'Partners' })).toBeInTheDocument();
    // Breadcrumb end item, header and button text
    expect(await findAllByText('Create partner')).toHaveLength(3);
    expect(
      await findByRole('heading', { name: 'Create partner' }),
    ).toBeInTheDocument();
    expect(
      await findByText(
        `Enter the full registered business name, the name to display on the dashboard, and the contact email the business will use to receive important updates from Paycast.`,
      ),
    ).toBeInTheDocument();
    expect(
      await findByLabelText('Registered business name'),
    ).toBeInTheDocument();
    expect(await findByLabelText('Business display name')).toBeInTheDocument();
    expect(await findByLabelText('Contact email')).toBeInTheDocument();
    expect(
      await findByRole('button', { name: 'Create partner' }),
    ).toBeInTheDocument();
  });
});
