import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { Button, Badge } from '@openedx/paragon';

import urls from 'data/services/lms/urls';
import { reduxHooks, apiHooks } from 'hooks';

import { findCoursesNavDropdownClicked } from '../hooks';
import messages from '../messages';

export const CollapseMenuBody = ({ isOpen }) => {
  const { formatMessage } = useIntl();
  const { authenticatedUser } = React.useContext(AppContext);

  const { enabled: programsEnabled } = apiHooks.useProgramsConfig();

  const dashboard = reduxHooks.useEnterpriseDashboardData();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();

  const exploreCoursesClick = findCoursesNavDropdownClicked(
    urls.baseAppUrl(courseSearchUrl),
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="d-flex flex-column shadow-sm nav-small-menu">
      <Button as="a" href={`${getConfig().LMS_BASE_URL}/`} variant="inverse-primary">
        {formatMessage(messages.course)}
      </Button>
      <Button
        as="a"
        href={urls.baseAppUrl(courseSearchUrl)}
        variant="inverse-primary"
        onClick={exploreCoursesClick}
      >
        {formatMessage(messages.discoverNew)}
      </Button>
      <Button as="a" href={getConfig().SUPPORT_URL} variant="inverse-primary">
        {formatMessage(messages.help)}
      </Button>
      {authenticatedUser && (
        <>
          {!!dashboard && (
            <Button as="a" href={dashboard.url} variant="inverse-primary">
              {formatMessage(messages.dashboard)}
            </Button>
          )}
          <Button
            as="a"
            href={getConfig().LOGOUT_URL}
            variant="inverse-primary"
          >
            {formatMessage(messages.signOut)}
          </Button>
        </>
      )}
    </div>
  );
};

CollapseMenuBody.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default CollapseMenuBody;
