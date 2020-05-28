import React from 'react';
import PropTypes from 'prop-types';

import { Header } from 'components';

function Layout({ children }) {
  return (
    <>
      <div className="app-wrapper">
        <Header />
        {children}
      </div>
      <style jsx>
        {`
          .app-wrapper {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            min-height: 100vh;
            padding: 25px;
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
