import React, { useEffect } from 'react';

import { useSWR } from 'swr';
import { parseCookies } from 'nookies';

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
