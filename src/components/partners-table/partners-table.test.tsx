import React from 'react';

import { render, within } from '@shieldpay/wheeljack/testing';

import { Partner, PartnersTable } from './partners-table';

const data: Array<Partner> = [
  {
    id: '507da776-6550-487d-bd38-159919006995',
    fullLegalName: 'Norma’s Double R',
    displayName: 'Double R Diner',
    alias: 'DRD',
    sftpUsername: 'double-r',
    isActive: true,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP',
    emails: [
      {
        emailAddress: 'n.jennings@doubler.com',
        isActive: true,
        createdAt: 'TIMESTAMP',
        updatedAt: 'TIMESTAMP',
        validatedAt: 'TIMESTAMP',
      },
    ],
  },
  {
    id: '507da776-6550-487d-bd78-159912006995',
    fullLegalName: 'Ed’s Gas Farm',
    displayName: 'Big Ed’s Gas Farm',
    alias: 'GEGF',
    sftpUsername: 'big-eds-gas-farm',
    isActive: true,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP',
    emails: [
      {
        emailAddress: 'e.hurley54@hotmail.com',
        isActive: true,
        createdAt: 'TIMESTAMP',
        updatedAt: 'TIMESTAMP',
        validatedAt: 'TIMESTAMP',
      },
    ],
  },
  {
    id: '507da776-6550-487d-bd38-159219006975',
    fullLegalName: 'The Great Northern',
    displayName: 'The Great Northern Hotel',
    alias: 'GNH',
    sftpUsername: 'great-northern-hotel',
    isActive: true,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP',
    emails: [
      {
        emailAddress: 'b.paige@great-northern-hotel.com',
        isActive: true,
        createdAt: 'TIMESTAMP',
        updatedAt: 'TIMESTAMP',
        validatedAt: 'TIMESTAMP',
      },
    ],
  },
];

describe('<PartnersTable />', () => {
  it('renders columns and headers correctly', () => {
    const { getByRole, getAllByRole } = render(<PartnersTable data={data} />);

    expect(getByRole('table', { name: 'Partners table' })).toBeInTheDocument();

    const headers = getAllByRole('columnheader');
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveTextContent('Registered business name');
    expect(headers[1]).toHaveTextContent('Business display name');
    expect(headers[2]).toHaveTextContent('Contact email');

    const rowgroups = getAllByRole('rowgroup');
    expect(rowgroups).toHaveLength(2);

    const dataRows = within(rowgroups[1]).getAllByRole('row');

    const allCellsTextContent = dataRows.map((row) =>
      within(row)
        .getAllByRole('cell')
        .map((cell) => cell.textContent),
    );

    expect(allCellsTextContent).toEqual([
      ['Norma’s Double R', 'Double R Diner', 'n.jennings@doubler.com'],
      ['Ed’s Gas Farm', 'Big Ed’s Gas Farm', 'e.hurley54@hotmail.com'],
      [
        'The Great Northern',
        'The Great Northern Hotel',
        'b.paige@great-northern-hotel.com',
      ],
    ]);
  });
});
