import React from 'react';

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

import { Media } from 'utils/mediaRender';

function Header() {
  return (
    <>
      <Media at="xs">
        <HeaderMobile />
      </Media>
      <Media greaterThanOrEqual="sm">
        <HeaderDesktop />
      </Media>
    </>
  );
}

export default Header;
