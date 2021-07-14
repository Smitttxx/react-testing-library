import React, { lazy, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { ProtectedRoute } from './components/protected-route/protected-route';

const LoginPage = lazy(() =>
  import('./pages/login').then((module) => ({ default: module.LoginPage })),
);

const BalancesPage = lazy(() =>
  import('./pages/balances').then((module) => ({
    default: module.BalancesPage,
  })),
);

const DashboardPage = lazy(() =>
  import('./pages/dashboard').then((module) => ({
    default: module.DashboardPage,
  })),
);

const CreatePartnerPage = lazy(() =>
  import('./pages/create-partner').then((module) => ({
    default: module.CreatePartnerPage,
  })),
);

const PartnersPage = lazy(() =>
  import('./pages/partners').then((module) => ({
    default: module.PartnersPage,
  })),
);

export const App = () => {
  return (
    <Suspense fallback="Loading...">
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={() => <Redirect to="/dashboard" />}
          loggedOut={LoginPage}
        />
        <ProtectedRoute exact path="/dashboard" loggedIn={DashboardPage} />
        <ProtectedRoute exact path="/balances" loggedIn={BalancesPage} />
        <ProtectedRoute
          exact
          path="/partners/create-partner"
          loggedIn={CreatePartnerPage}
        />
        <ProtectedRoute exact path="/partners" loggedIn={PartnersPage} />
        <Redirect to="/" />;
      </Switch>
    </Suspense>
  );
};
