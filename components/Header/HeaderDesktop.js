import React from 'react';
import Link from 'next/link';

import SVG from 'react-inlinesvg';

function HeaderDesktop() {
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
          <span>
            <Link href="/login">
              <a className="desktop-header__link">Inicia sesión</a>
            </Link>{' '}
            o{' '}
            <Link href="/sign-up">
              <a className="desktop-header__link">regístrate</a>
            </Link>
          </span>
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
          }
        `}
      </style>
    </>
  );
}

export default HeaderDesktop;
