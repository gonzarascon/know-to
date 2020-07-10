import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Colors, media } from 'constants';

import { Header, ProfileConfiguration } from 'components';
import { useProfileConfigurationState } from 'contexts/ProfileConfigurationContext';

function Layout({ children, backgroundImage }) {
  const [mainImage, setMainImage] = useState(null);

  const { visible: profileConfiguration } = useProfileConfigurationState();

  useEffect(() => {
    if (!backgroundImage) {
      // Check for backgroundImage in localstorage
      const { portada } = JSON.parse(localStorage.getItem('courseData'));

      setMainImage(portada.url);
    } else {
      setMainImage(backgroundImage);
    }
  }, []);

  useEffect(() => {
    const body = document.getElementsByTagName('body');
    if (profileConfiguration) {
      body[0].style.overflow = 'hidden';
    } else {
      body[0].style.overflow = 'auto';
    }
  }, [profileConfiguration]);

  return (
    <>
      <div className="app-wrapper">
        <Header />
        <div className="app-wrapper__background-desktop"></div>
        <main className="main-wrapper">{children}</main>
        {profileConfiguration && <ProfileConfiguration />}
      </div>
      <style jsx>
        {`
          .app-wrapper {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            min-height: 100vh;
            padding: 25px;
            padding-bottom: 50px;
            position: relative;
            background: linear-gradient(
                to bottom,
                ${Colors.darkBlue200.setAlpha(0.97).toRGB()} 0%,
                ${Colors.darkBlue200.setAlpha(0.97).toRGB()} 100%
              ),
              url(${mainImage}) no-repeat;
            background-attachment: fixed;
            background-position: center center;

            @media ${media.mediumDevice} {
              padding-bottom: 25px;
              background: none;
            }

            &__background-desktop {
              display: none;
              @media ${media.mediumDevice} {
                display: block;
                position: fixed;
                top: 0;
                right: 0;
                width: 50%;
                height: 100vh;
                background: linear-gradient(
                    to right,
                    ${Colors.darkBlue200.setAlpha(1).toRGB()} 35%,
                    ${Colors.darkBlue200.setAlpha(0).toRGB()} 65%
                  ),
                  url(${mainImage}) no-repeat;
                background-position: 20% center;
                z-index: -1;
                background-size: cover;
              }
            }
          }

          .main-wrapper {
            min-height: calc(100vh - 122px - 50px);
            height: 100%;
            width: 100%;

            margin-top: 100px;

            display: flex;
            flex-direction: column;

            @media ${media.mediumDevice} {
              margin-top: 122px;
            }
          }
        `}
      </style>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.any,
  ]).isRequired,
};

export default Layout;
