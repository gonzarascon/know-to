import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import Router from 'next/router';

import Avatar from 'react-avatar';
import SVG from 'react-inlinesvg';
import { UserOutlined } from '@ant-design/icons';

import { useUserState } from 'contexts/UserContext';

function HeaderMobile({ toggleMenu }) {
  const { userData } = useUserState();

  function redirectToLogin() {
    Router.push('/login');
  }

  return (
    <>
      <header className="mobile-header">
        <div className="mobile-header__content">
          <h1 className="mobile-header__logo">
            <Link href="/">
              <a className="mobile-header__link">
                <SVG src="/images/svg/logo-dark.svg" title="KnowTo" />
              </a>
            </Link>
          </h1>
          {!userData && (
            <button
              className="mobile-header__user-button"
              onClick={() => redirectToLogin()}
            >
              <UserOutlined className="mobile-header__user-icon" />
            </button>
          )}

          {userData && (
            <div
              className="mobile-header__avatar-container --menu-element"
              onClick={(e) => toggleMenu(e.target)}
            >
              <Avatar
                name={userData.username}
                src={
                  userData.foto_de_perfil ? userData.foto_de_perfil.url : null
                }
                round
                size="45px"
                alt={userData.username}
                className="mobile-header__avatar --menu-element"
              />
            </div>
          )}
        </div>
      </header>
      <style jsx>
        {`
          .mobile-header {
            position: fixed;
            z-index: 3;
            top: 0;
            left: 0;
            width: 100%;
            background: var(--g-black-alpha);

            &__content {
              max-width: 1200px;
              margin: 0 auto;
              display: flex;
              flex-direction: row;
              height: 122px;
              align-items: center;
              justify-content: space-between;
              padding: 25px;
            }

            &__logo {
              width: 150px;
              height: 38.59px;

              & .mobile-header__link {
                width: 100%;
                height: 100%;

                :global(svg) {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            &__user-button {
              background-color: transparent;
              border: none;
              padding: 0;
              width: 30px;
              height: 30px;

              &:focus {
                outline: none;
              }

              & :global(.mobile-header__user-icon) {
                width: 100%;
                height: 100%;
                color: white;

                & :global(svg) {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            & :global(.mobile-header__avatar) {
              object-fit: cover;
              object-position: center;
            }
          }
        `}
      </style>
    </>
  );
}

HeaderMobile.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export default HeaderMobile;
