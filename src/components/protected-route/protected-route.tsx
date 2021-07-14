import React, { ElementType } from 'react';
import { useIntl } from 'react-intl';
import { Redirect, Route } from 'react-router-dom';

import { useAuthenticatedUser } from '@shieldpay/authentication-ui';
import { TopBar } from '@shieldpay/bumblebee';

import { DashboardLayout } from '../dashboard-layout/dashboard-layout';

interface ProtectedRouteProps {
  path: string;
  exact?: boolean;
  loggedIn: ElementType;
  loggedOut?: ElementType;
}

export const ProtectedRoute = ({
  loggedIn: LoggedIn,
  loggedOut,
  exact,
  path,
}: ProtectedRouteProps) => {
  const LoggedOut = loggedOut || (() => <Redirect to="/" />);

  const {
    user: { signedIn, email, groups },
    signOut,
  } = useAuthenticatedUser();

  const { formatMessage } = useIntl();

  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        return signedIn ? (
          <>
            <TopBar
              email={email || ''}
              group={groups?.length ? groups[0] : ''}
              logOutText={formatMessage({ id: 'login.logOut' })}
              logOutCallback={signOut}
            />
            <DashboardLayout>
              <LoggedIn />
            </DashboardLayout>
          </>
        ) : (
          <LoggedOut />
        );
      }}
    />
  );
};
