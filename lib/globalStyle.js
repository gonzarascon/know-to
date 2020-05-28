import css from 'styled-jsx/css';
import { pxToRem } from 'utils/helpers';
import { Colors, media } from 'constants';

export const globalStyles = css.global`
  /* root vars */
  :root {
    --black: ${Colors.black.toCSS()};
    --white: ${Colors.white.toCSS()};
    --orange: ${Colors.orange.toCSS()};
    --gray-100: ${Colors.gray100.toCSS()};
    --gray-200: ${Colors.gray200.toCSS()};
    --dark-blue-100: ${Colors.darkBlue100.toCSS()};
    --dark-blue-200: ${Colors.darkBlue200.toCSS()};
    --red-100: ${Colors.red100.toCSS()};
    --red-200: ${Colors.red200.toCSS()};
    --green-100: ${Colors.green100.toCSS()};
    --green-200: ${Colors.green200.toCSS()};
    --action-primary: ${Colors.actionPrimary.toCSS()};

    --g-black-alpha: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 10%,
      rgba(113, 64, 141, 0) 75%
    );

    --f-ultra: 600;
    --f-black: 500;
    --f-bold: bold;
    --f-regular: normal;
    --f-light: 300;

    --f-OpenSans: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;

    --f-Rubik: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    background-color: var(--dark-blue-200);
    color: var(--white);
    font-family: var(--f-OpenSans);
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

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* iphone X */
  @media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .app-wrapper {
      min-height: -webkit-fill-available;
    }
  }
  /* iphone XS Max */
  @media only screen and (min-device-width: 414px) and (max-device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .app-wrapper {
      min-height: -webkit-fill-available;
    }
  }
  /* iphone 6+, 6s+, 7+, 8+ */
  @media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3) {
    .app-wrapper {
      min-height: -webkit-fill-available;
    }
  }

  /* iPhone XS Max, XR */
  @media only screen and (min-device-width: 414px) and (max-device-height: 896px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3) {
    .app-wrapper {
      min-height: -webkit-fill-available;
    }
  }

  @media only screen and (min-device-width: 414px) and (max-device-height: 896px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3) {
    .app-wrapper {
      min-height: -webkit-fill-available;
    }
  }

  /* 
      Utilitary classes & Styles
  */

  .wrapper {
    height: 100%;
    width: 100%;
    min-height: calc(100vh - 122px - 50px);
  }

  & [class*='__big-heading'] {
    font-family: var(--f-Rubik);
    font-size: ${pxToRem(30)};

    @media ${media.mediumDevice} {
      font-size: ${pxToRem(40)};
    }
  }

  /**
  * Fonts declaration
  */

  @font-face {
    font-family: 'Open Sans';
    src: url('./fonts/OpenSans-Bold.woff2') format('woff2'),
      url('./fonts/OpenSans-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url('./fonts/OpenSans-Regular.woff2') format('woff2'),
      url('./fonts/OpenSans-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url('./fonts/OpenSans-BoldItalic.woff2') format('woff2'),
      url('./fonts/OpenSans-BoldItalic.woff') format('woff');
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url('./fonts/OpenSans-Light.woff2') format('woff2'),
      url('./fonts/OpenSans-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url('./fonts/OpenSans-LightItalic.woff2') format('woff2'),
      url('./fonts/OpenSans-LightItalic.woff') format('woff');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url('./fonts/OpenSans-Italic.woff2') format('woff2'),
      url('./fonts/OpenSans-Italic.woff') format('woff');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Rubik';
    src: url('./fonts/Rubik-Light.woff2') format('woff2'),
      url('./fonts/Rubik-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Rubik';
    src: url('./fonts/Rubik-Bold.woff2') format('woff2'),
      url('./fonts/Rubik-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Rubik';
    src: url('./fonts/Rubik-BoldItalic.woff2') format('woff2'),
      url('./fonts/Rubik-BoldItalic.woff') format('woff');
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: 'Rubik';
    src: url('./fonts/Rubik-LightItalic.woff2') format('woff2'),
      url('./fonts/Rubik-LightItalic.woff') format('woff');
    font-weight: 300;
    font-style: italic;
  }
`;
