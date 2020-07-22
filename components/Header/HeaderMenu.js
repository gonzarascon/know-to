import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';

import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';

import { pxToRem, useOutsideAlerter } from 'utils/helpers';
import media from 'constants/media';

import {
  useProfileConfigurationDispatch,
  setProfileConfigurationAction,
} from 'contexts/ProfileConfigurationContext';

function HeaderMenu({ toggleMenu }) {
  const router = useRouter();
  const profileDispatch = useProfileConfigurationDispatch();

  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef, () => toggleMenu());

  function handleProfileConfiguration() {
    profileDispatch(setProfileConfigurationAction(true));
    toggleMenu();
  }

  function handleClickOutside(e) {
    if (
      wrapperRef.current.contains(e.target) ||
      e.target.className.includes('--menu-element')
    ) {
      return;
    }

    toggleMenu();
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleLogout() {
    destroyCookie(null, 'auth_token');
    localStorage.setItem('userData', null);

    if (router.pathname !== '/') {
      router.push('/');
    }

    toggleMenu();
  }

  return (
    <>
      <div className="header__menu-wrapper" ref={wrapperRef}>
        <div className="header__menu">
          <span className="header__menu-pike" />
          <ul className="header__menu-list">
            <li
              className="header__menu-item"
              onClick={handleProfileConfiguration}
            >
              <SettingOutlined className="header__item-icon" />
              Mi cuenta
            </li>
            <li className="header__menu-item" onClick={handleLogout}>
              <LogoutOutlined className="header__item-icon" />
              Cerrar sesión
            </li>
          </ul>
        </div>
      </div>

      <style jsx>
        {`
          .header {
            &__menu-wrapper {
              position: absolute;
              z-index: 5;
              right: 15px;
              top: 100px;
              @media ${media.mediumDevice} {
                right: 50px;
                top: 100px;
              }
            }

            &__menu {
              background-color: var(--white);
              border-radius: 10px;
              position: relative;
              width: calc(100vw - 30px);
              height: 150px;
              @media ${media.mediumDevice} {
                height: 125px;
                width: 250px;
              }
            }

            &__menu-pike {
              transform: rotate(45deg);
              position: absolute;
              display: block;
              top: -3px;
              right: 10px;
              background-color: var(--white);
              width: 30px;
              height: 30px;
              z-index: 4;
            }

            &__menu-list {
              padding: 10px 0px;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              z-index: 6;
              position: relative;
              overflow: hidden;
            }

            &__menu-item {
              color: var(--dark-blue-100);
              font-size: ${pxToRem(18)};
              display: flex;
              padding: 10px 20px;
              align-items: center;
              flex-wrap: no-wrap;

              @media (hover: hover) {
                &:hover {
                  background-color: var(--gray-200);
                  color: var(--white);
                  cursor: pointer;
                }
              }
            }
          }

          :global(.header__item-icon) {
            font-size: ${pxToRem(22)};
            margin-right: 15px;
          }
        `}
      </style>
    </>
  );
}

HeaderMenu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export default HeaderMenu;
