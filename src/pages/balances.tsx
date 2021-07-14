import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';

import { Box, Dropdown, Heading } from '@shieldpay/bumblebee';

import { apiRoutes } from '../hooks/config';
import { useFetch } from '../hooks/use-fetch';

export const BalancesPage = () => {
  const getPartners = useFetch(apiRoutes.partners);
  const { isFetched, data } = useQuery('partners', getPartners);

  const partnersDropdownItems: { label: string; value: string }[] = [
    { label: 'All partners', value: 'unfiltered' },
  ];

  if (isFetched) {
    const partners = data.partners;
    partners.map((partner: any) => {
      partnersDropdownItems.push({
        label: partner.fullLegalName,
        value: partner.alias,
      });
    });
  }

  return (
    <Box spacing="base" alignItems={['left', 'center']}>
      <Heading visualLevel="2">
        <FormattedMessage id="defaults.balances" />
      </Heading>
      <Dropdown
        label={<FormattedMessage id="defaults.partners" />}
        size="medium"
        placeholder="Partners..."
        items={partnersDropdownItems}
        disabled={isFetched ? false : true}
        onChange={() => {
          //
        }}
      />
    </Box>
  );
};
