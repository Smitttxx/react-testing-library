import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { DataTable } from '@shieldpay/bumblebee';

// TODO EmailItem and Partner type shapes need confirming: They are based on this comment:
// https://shieldpay.atlassian.net/browse/PMVP-95?focusedCommentId=23243
interface EmailItem {
  emailAddress: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  validatedAt: string;
}

export interface Partner {
  id: string;
  fullLegalName: string;
  displayName: string;
  alias: string;
  sftpUsername: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  emails: Array<EmailItem>;
}

interface PartnersTableProps {
  data: Array<Partner>;
}

const columns = [
  {
    headerName: (
      <FormattedMessage id="paycast.partners.registeredBusinessName" />
    ),
    field: 'fullLegalName',
  },
  {
    headerName: <FormattedMessage id="paycast.partners.businessDisplayName" />,
    field: 'displayName',
  },
  {
    headerName: <FormattedMessage id="paycast.partners.contactEmail" />,
    field: 'emailAddress',
  },
];

export const PartnersTable = ({ data }: PartnersTableProps) => {
  const { formatMessage } = useIntl();

  const rows = data.map(({ fullLegalName, displayName, id, emails }) => ({
    id,
    fullLegalName,
    displayName,
    emailAddress: emails[0].emailAddress,
  }));

  return (
    <DataTable
      caption={formatMessage({ id: 'paycast.partners.table' })}
      rows={rows}
      columns={columns}
    />
  );
};
