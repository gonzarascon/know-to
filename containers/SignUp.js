import React from 'react';
import PropTypes from 'prop-types';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';

import { Button, FormInput } from 'components';

function SignUp() {
  return (
    <>
      <section className="wrapper wrapper--login">
        <div className="wrapper__content">
          <h2 className="wrapper__big-heading">Crea una cuenta</h2>
          <form className="wrapper_login-form">
            <FormInput
              label="Nombre de usuario"
              placeholder="Ingresa tu nombre de usuario"
            />
            <FormInput label="E-mail" placeholder="usuario@ejemplo.com" />
            <FormInput
              label="Contraseña"
              placeholder="Ingresa una contraseña"
            />
            <span className="wrapper_input-help">
              Tu contraseña debe contener mínimo 6 caracteres.{' '}
            </span>
            <Button className="wrapper_submit">Crear cuenta</Button>
          </form>
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

              & .wrapper_input-help {
                margin: 10px 0;
                display: inline-block;
                margin-left: 5px;
              }

              & :global(.wrapper_submit) {
                margin-top: 50px;
              }
            }
          }
        `}
      </style>
    </>
  );
}

export default SignUp;
