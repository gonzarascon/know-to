import css from 'styled-jsx/css';
import { pxToRem } from 'utils/helpers';
import { Colors } from 'constants';
export const globalStyles = css.global`
  /* root vars */
  :root {
    --black: ${Colors.black.toCSS()};
    --darkgray: #191919;
    --white: ${Colors.white.toCSS()};
    --purple: #6c3c8a;

    --f-ultra: 600;
    --f-black: 500;
    --f-bold: bold;
    --f-light: normal;
    --f-xlight: 300;
  }

  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  ul[class],
  ol[class] {
    padding: 0;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    background-color: var(--black);
    color: var(--white);
    font-family: var(--avenir-heavy);
    --safe-area-inset-bottom: env(safe-area-inset-bottom);
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  ul[class],
  ol[class] {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img {
    max-width: 100%;
    display: block;
  }

  /* Natural flow and rhythm in articles by default */
  article > * + * {
    margin-top: 1em;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  .hackSpace {
    width: 100%;
    height: auto;
    margin-top: 50px;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* 
    * Fonts 
    */

  @font-face {
    font-family: 'Gotham';
    src: url('/fonts/Gotham-Bold.woff2') format('woff2'),
      url('/fonts/Gotham-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham';
    src: url('/fonts/Gotham-Light.woff2') format('woff2'),
      url('/fonts/Gotham-Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham';
    src: url('/fonts/Gotham-Black.woff2') format('woff2'),
      url('/fonts/Gotham-Black.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham';
    src: url('/fonts/Gotham-Ultra.woff2') format('woff2'),
      url('/fonts/Gotham-Ultra.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham';
    src: url('/fonts/Gotham-XLight.woff2') format('woff2'),
      url('/fonts/Gotham-XLight.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  html {
    & * {
      font-family: 'Gotham', --apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    }
  }

  /* iphone X */
  @media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .wrapper {
      min-height: -webkit-fill-available;
    }
  }
  /* iphone XS Max */
  @media only screen and (min-device-width: 414px) and (max-device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .wrapper {
      min-height: -webkit-fill-available;
    }
  }
  /* iphone 6+, 6s+, 7+, 8+ */
  @media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3) {
    .wrapper {
      min-height: -webkit-fill-available;
    }
  }

  /* iPhone XS Max, XR */
  @media only screen and (min-device-width: 414px) and (max-device-height: 896px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3) {
    .wrapper {
      min-height: -webkit-fill-available;
    }
  }

  @media only screen and (min-device-width: 414px) and (max-device-height: 896px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3) {
    .wrapper {
      min-height: -webkit-fill-available;
    }
  }

  /* 
      Utilitary classes & Styles
  */

  p {
    font-size: ${pxToRem(25)};
  }

  .section-title {
    font-weight: var(--f-ultra);
    font-size: ${pxToRem(40)};
    text-transform: uppercase;
    width: 100%;
  }

  .list-title {
    font-weight: var(--f-bold);
    font-size: ${pxToRem(25)};
    position: relative;
    margin-bottom: 10px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: -50px;
      top: 20px;
      width: 30px;
      height: 5px;
      background-color: var(--white);
    }
  }

  .bulleted-list {
    list-style: disc !important;
    padding-left: 20px !important;
  }

  .list-item {
    font-weight: var(--f-light);
    font-size: ${pxToRem(20)};
  }

  .scheme-dark {
    background-color: var(--black);
    color: var(--white);

    & :global(header) {
      background: linear-gradient(
        180deg,
        var(--black) 30%,
        rgba(0, 0, 0, 0) 100%
      );
    }

    & :global(.logo svg path:last-child) {
      stroke: var(--white);
    }

    & :global(svg path) {
      fill: var(--white);
    }

    .list-title {
      &::before {
        background-color: var(--white);
      }
    }

    :global(.mobile-drawer) {
      color: var(--black);
      background-color: var(--white);

      & :global(path) {
        fill: var(--black);
      }
    }
  }

  .scheme-light {
    background-color: var(--white);
    color: var(--black);

    & :global(header) {
      background: linear-gradient(
        180deg,
        var(--white) 30%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    & :global(.logo svg path:last-child) {
      stroke: var(--black);
    }

    & :global(svg path) {
      fill: var(--black);
    }

    .list-title {
      &::before {
        background-color: var(--black);
      }
    }

    :global(.mobile-drawer) {
      background-color: var(--black);
      color: var(--white);

      & :global(path) {
        fill: var(--white);
      }
    }
  }
`;
