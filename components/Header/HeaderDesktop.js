import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import SVG from 'react-inlinesvg';
import Avatar from 'react-avatar';
import { DownOutlined } from '@ant-design/icons';

import { Colors } from 'constants';
import { pxToRem } from 'utils/helpers';

import { useUserState } from 'contexts/UserContext';

function HeaderDesktop({ toggleMenu }) {
  const { userData } = useUserState();

  return (
    <>
      <header className="desktop-header">
        <div className="desktop-header__content">
          <h1 className="desktop-header__logo">
            <Link href="/">
              <a className="desktop-header__link">
                <SVG src="/images/svg/logo-dark.svg" title="KnowTo" />
              </a>
            </Link>
          </h1>
          {!userData && (
            <span>
              <Link href="/login">
                <a className="desktop-header__link">Inicia sesión</a>
              </Link>{' '}
              o{' '}
              <Link href="/sign-up">
                <a className="desktop-header__link">regístrate</a>
              </Link>
            </span>
          )}
          {userData && (
            <div
              className="desktop-header__avatar-container"
              onClick={() => toggleMenu()}
            >
              <Avatar
                name={userData.username}
                src={userData.foto_de_perfil.url}
                round
                size="35px"
                alt={userData.username}
                className="desktop-header__avatar"
              />
              <span className="desktop-header__username">
                {userData.username}
              </span>
              <DownOutlined className="desktop-header__menu-arrow" />
            </div>
          )}
        </div>
      </header>
      <style jsx>
        {`
          .desktop-header {
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

              & .desktop-header__link {
                width: 100%;
                height: 100%;

                :global(svg) {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            & .desktop-header__link {
              text-decoration: none;
            }

            &__avatar-container {
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              border-radius: 8px;
              padding: 10px;
              user-select: none;

              @media (hover: hover) {
                &:hover {
                  background-color: ${Colors.actionPrimary
                    .setAlpha(0.1)
                    .setLightness(0.6)
                    .toCSS()};
                  cursor: pointer;

                  & :global(.desktop-header__menu-arrow) {
                    color: var(--white);
                  }
                }
              }
            }

            & :global(.desktop-header__avatar) {
              object-fit: cover;
              object-position: center;
            }

            &__username {
              display: block;
              margin: 0 15px;
              font-family: var(--f-Rubik);
              font-size: ${pxToRem(20)};
            }

            & :global(.desktop-header__menu-arrow) {
              color: var(--action-primary);
            }
          }
        `}
      </style>
    </>
  );
}

HeaderDesktop.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export default HeaderDesktop;
