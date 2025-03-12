import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { AvatarButton, Dropdown, Badge } from '@openedx/paragon';

import { reduxHooks } from 'hooks';

import messages from '../messages';

export const AuthenticatedUserDropdown = () => {
  const { formatMessage } = useIntl();
  const { authenticatedUser } = React.useContext(AppContext);
  const dashboard = reduxHooks.useEnterpriseDashboardData();

  return (
    authenticatedUser && (
      <Dropdown className="user-dropdown pr4">
        <Dropdown.Toggle
          as={AvatarButton}
          src={authenticatedUser.profileImage}
          id="user"
          variant="light"
          className="p-4"
        >
          <span data-hj-suppress className="d-md-inline">
            {authenticatedUser.username}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-right">
          { getConfig().ENABLE_EDX_PERSONAL_DASHBOARD && (
            <>
              <Dropdown.Header>{formatMessage(messages.dashboardSwitch)}</Dropdown.Header>
              <Dropdown.Item as="a" href="/edx-dashboard" className="active">
                {formatMessage(messages.dashboardPersonal)}
              </Dropdown.Item>
              {!!dashboard && (
                <Dropdown.Item as="a" href={dashboard.url} key={dashboard.label}>
                  {dashboard.label} {formatMessage(messages.dashboard)}
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
            </>
          )}
          <Dropdown.Divider />
          <Dropdown.Item href={`https://neontoservices.ciamlogin.com/neontoservices.onmicrosoft.com/oauth2/v2.0/logout?post_logout_redirect_uri=${getConfig().LMS_BASE_URL}/logout`}>
            {formatMessage(messages.signOut)}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  );
};

AuthenticatedUserDropdown.propTypes = {};

export default AuthenticatedUserDropdown;
