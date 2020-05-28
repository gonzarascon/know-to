import React from 'react';
import PropTypes from 'prop-types';

import { Colors, media } from 'constants';

import { Header } from 'components';

function Layout({ children }) {
  return (
    <>
      <div className="app-wrapper">
        <Header />
        <div className="app-wrapper__background-desktop"></div>
        <main className="main-wrapper">{children}</main>
      </div>
      <style jsx>
        {`
          .app-wrapper {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            min-height: 100vh;
            padding: 25px;

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
                  url('./images/bg-image-default.png') no-repeat;
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

            margin-top: 122px;

            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Layout;
