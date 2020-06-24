import React, { useEffect, useState } from 'react';

// TODO: validate user token with SWR
import { useSWR } from 'swr';
import { parseCookies } from 'nookies';

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

import {
  useUserState,
  useUserDispatch,
  setUserAction,
} from 'contexts/UserContext';

import { Media } from 'utils/mediaRender';

function Header() {
  const { userData } = useUserState();
  const dispatch = useUserDispatch();

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem('userData'));
    if (localUserData && localUserData !== userData) {
      dispatch(setUserAction(localUserData));
    }
  }, []);

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
