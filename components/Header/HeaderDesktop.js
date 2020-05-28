import React from 'react';

import SVG from 'react-inlinesvg';

function HeaderDesktop() {
  return (
    <>
      <header className="desktop-header">
        <div className="desktop-header-content">
          <h1 className="desktop-header-logo">
            <a>
              <SVG src="./images/svg/logo-dark.svg" title="KnowTo" />
            </a>
          </h1>
          <span>
            <a>Inicia sesión</a> o <a>regístrate</a>
          </span>
        </div>
      </header>
      <style jsx>
        {`
          .desktop-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: var(--g-black-alpha);

            &-content {
              max-width: 1200px;
              margin: 0 auto;
              display: flex;
              flex-direction: row;
              height: 122px;
              align-items: center;
              justify-content: space-between;
            }

            &-logo {
              width: 192px;
              height: 38.59px;

              a {
                width: 100%;
                height: 100%;

                :global(svg) {
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

export default HeaderDesktop;