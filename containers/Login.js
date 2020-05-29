import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';

import { Button, FormInput } from 'components';

function Login() {
  return (
    <>
      <section className="wrapper wrapper--login">
        <div className="wrapper__content">
          <h2 className="wrapper__big-heading">Inicia sesión</h2>
          <form className="wrapper_login-form">
            <FormInput label="E-mail" placeholder="usuario@ejemplo.com" />
            <FormInput label="Contraseña" />
            <a className="wrapper_link">¿Olvidaste tu contraseña?</a>
            <Button className="wrapper_submit">Inciar sesión</Button>
          </form>
          <span className="wrapper_create-account">
            ¿No tienes cuenta?{' '}
            <Link href="/sign-up">
              <a className="wrapper_link">Regístrate.</a>
            </Link>
          </span>
        </div>
      </section>
      <style jsx>
        {`
          .wrapper {
            &--login {
              display: flex;
              flex-direction: column;
              justify-content: center;

              & .wrapper__big-heading {
                margin-bottom: 25px;
              }

              & .wrapper__content {
                @media ${media.mediumDevice} {
                  width: 40%;
                }
              }

              & .wrapper_link {
                color: var(--action-primary);
                margin: 15px 0;
                display: inline-block;
                font-size: ${pxToRem(18)};
                text-decoration: none;
              }

              & :global(.wrapper_submit) {
                margin-top: 50px;
              }

              & .wrapper_create-account {
                font-size: ${pxToRem(18)};
                margin-top: 25px;
                display: block;
                text-align: center;

                @media ${media.mediumDevice} {
                  display: inline-block;
                  text-align: left;
                }
              }
            }
          }
        `}
      </style>
    </>
  );
}

export default Login;
