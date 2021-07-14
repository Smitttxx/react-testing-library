import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  DashboardLayout as Layout,
  NavigationLogo,
  PrimaryNav,
} from '@shieldpay/bumblebee';

import { PaycastIcon } from '../logos/PaycastIcon';
import { PaycastLogo } from '../logos/PaycastLogo';

interface DashboardLayoutProps {
  children: ReactNode;
}

const routes = {
  dashboard: '/dashboard',
  balances: '/balances',
  partners: '/partners',
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Layout
      header={
        <NavigationLogo
          to={routes.dashboard}
          icon={PaycastIcon}
          logo={PaycastLogo}
        />
      }
      navItems={
        <>
          <PrimaryNav.Item to={routes.dashboard}>
            <FormattedMessage id="defaults.dashboard" />
          </PrimaryNav.Item>
          <PrimaryNav.Item to={routes.balances}>
            <FormattedMessage id="defaults.balances" />
          </PrimaryNav.Item>
          <PrimaryNav.Item to={routes.partners}>
            <FormattedMessage id="defaults.partners" />
          </PrimaryNav.Item>
        </>
      }
    >
      {children}
    </Layout>
  );
};
