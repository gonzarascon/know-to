import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import SVG from 'react-inlinesvg';

import { UserOutlined } from '@ant-design/icons';

function HeaderMobile() {
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
          <button
            className="mobile-header__user-button"
            onClick={() => redirectToLogin()}
          >
            <UserOutlined className="mobile-header__user-icon" />
          </button>
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
          }
        `}
      </style>
    </>
  );
}

export default HeaderMobile;
