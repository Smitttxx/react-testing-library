import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Box, Heading, Link } from '@shieldpay/bumblebee';

export const PartnersPage = () => {
  return (
    <Box spacing="basePos5">
      <Box stack="row" alignItems={['full', 'bottom']}>
        <Heading visualLevel="2">
          <FormattedMessage id="defaults.partners" />
        </Heading>
        <Link to="/partners/create-partner">
          <FormattedMessage id="paycast.createPartner.title" />
        </Link>
      </Box>
    </Box>
  );
};
