import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { parseCookies } from 'nookies';

import { useRequest } from 'utils/helpers';

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import HeaderMenu from './HeaderMenu';

import {
  useUserState,
  useUserDispatch,
  setUserAction,
} from 'contexts/UserContext';

import { Media } from 'utils/mediaRender';

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [boxOffset, setBoxOffset] = useState({ x: 0, y: 0 });

  const { auth_token } = parseCookies();
  const { data } = useRequest(
    auth_token
      ? {
          url: `/api/check-user?at=${auth_token}`,
        }
      : null
  );

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

  function handleMenuToggle(e) {
    console.log(e);
    setMenuVisible(!menuVisible);
  }

  return (
    <>
      <Media at="xs">
        <HeaderMobile toggleMenu={handleMenuToggle} />
      </Media>
      <Media greaterThanOrEqual="sm">
        <HeaderDesktop
          toggleMenu={handleMenuToggle}
          setBoxOffset={setBoxOffset}
        />
      </Media>
      {menuVisible && (
        <HeaderMenu toggleMenu={handleMenuToggle} boxOffset={boxOffset} />
      )}
    </>
  );
}

export default Header;
