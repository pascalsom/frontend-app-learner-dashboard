import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@openedx/paragon';

import urls from 'data/services/lms/urls';
import { reduxHooks, apiHooks } from 'hooks';

import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import { useIsCollapsed, findCoursesNavClicked } from '../hooks';
import messages from '../messages';
import BrandLogo from '../BrandLogo';

export const ExpandedHeader = () => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const isCollapsed = useIsCollapsed();

  const { enabled: programsEnabled } = apiHooks.useProgramsConfig();
  const { metadata: userMetadata } = apiHooks.useUserMetadata();

  const exploreCoursesClick = findCoursesNavClicked(
    urls.baseAppUrl(courseSearchUrl),
  );
  console.log(userMetadata)
  if (isCollapsed) {
    return null;
  }

  return (
      <header className="d-flex shadow-sm align-items-center learner-variant-header pl-4">

        <BrandLogo/>
        <div className="d-flex align-items-center gap-2">
          <Button
              as="a"
              href={`${getConfig().LMS_BASE_URL}/dashboard/`}
              variant="inverse-primary"
              className="p-4 course-link"
          >
            {formatMessage(messages.course)}
          </Button>
          {programsEnabled && (
              <Button
                  as="a"
                  href={urls.programsUrl()}
                  variant="inverse-primary"
                  className="p-4"
              >
                {formatMessage(messages.program)}
              </Button>
          )}
          <Button
              as="a"
              href={urls.baseAppUrl(courseSearchUrl)}
              variant="inverse-primary"
              className="p-4"
              onClick={exploreCoursesClick}
          >
            {formatMessage(messages.discoverNew)}
          </Button>
        </div>
        <div className="flex-grow-1"/>
        <div className={"d-flex align-items-center gap-2"}>

          {
              userMetadata === "" && (
                  <Button
                      as="a"
                      href={urls.userProfileUrl(userMetadata.username)}
                      className={"mr-4"}
                      variant="primary"
                  >
                    {"Activate your License now"}
                  </Button>
              )
          }
        <Button
              as="a"
              href={getConfig().SUPPORT_URL}
              variant="inverse-primary"
              className="p-4"
          >
            {formatMessage(messages.help)}
          </Button>

        <AuthenticatedUserDropdown/>
          </div>
      </header>
  );
};

ExpandedHeader.propTypes = {};

export default ExpandedHeader;
