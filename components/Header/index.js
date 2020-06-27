import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { parseCookies } from 'nookies';

import { useRequest } from 'utils/helpers';

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

import {
  useUserState,
  useUserDispatch,
  setUserAction,
} from 'contexts/UserContext';

import { Media } from 'utils/mediaRender';

function Header() {
  const { auth_token } = parseCookies();
  const { data } = useRequest({
    url: `/api/check-user?at=${auth_token}`,
  });

  const { userData } = useUserState();
  const dispatch = useUserDispatch();

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem('userData'));
    if (localUserData && localUserData !== userData) {
      dispatch(setUserAction(localUserData));
    }
  }, []);

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem('userData'));

    if (data !== userData && !_.isEqual(data, localUserData)) {
      console.log('data set');
      dispatch(setUserAction(_.isEqual(data, undefined) ? null : data));
    }
  }, [data]);

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
