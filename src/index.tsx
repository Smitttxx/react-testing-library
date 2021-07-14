import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, NavLink } from 'react-router-dom';

import { AuthenticatedUserProvider } from '@shieldpay/authentication-ui';
import { BumblebeeProvider } from '@shieldpay/bumblebee';

import { App } from './app';

import defaultMessages from '@shieldpay/i18n/defaults/en-GB.json';
import loginMessages from '@shieldpay/i18n/login/en-GB.json';
import paycastMessages from '@shieldpay/i18n/paycast/en-GB.json';

const HMRApp = hot(App);

export const APP_ROOT = 'root';

const queryClient = new QueryClient();

const getNavigatorLanguage = (): string =>
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage ||
      'en';

render(
  <BumblebeeProvider NavLink={NavLink}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <IntlProvider
          locale={getNavigatorLanguage()}
          messages={{
            ...defaultMessages,
            ...loginMessages,
            ...paycastMessages,
          }}
        >
          <AuthenticatedUserProvider>
            <HMRApp />
          </AuthenticatedUserProvider>
        </IntlProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </BumblebeeProvider>,
  document.getElementById(APP_ROOT),
);
