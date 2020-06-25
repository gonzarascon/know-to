import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import _ from 'lodash';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';
import { loginUser } from 'lib/api/user';

import { Button, FormInput } from 'components';

function Login() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: null,
    password: null,
    formError: false,
  });

  function handleInputChange(value, key) {
    setLoginForm({ ...loginForm, [key]: value, formError: false });
  }

  // TODO: Handle button submit and redirect

  async function handleFormSubmit(e) {
    e.preventDefault();
    const { email, password } = loginForm;
    const { data } = await loginUser({ identifier: email, password });

    if (_.isEmpty(data)) {
      setLoginForm({ ...loginForm, formError: true });
      return;
    }

    setCookie(null, 'auth_token', data.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    localStorage.setItem('userData', JSON.stringify(data.user));

    router.push('/');
  }

  return (
    <>
      <section className="wrapper wrapper--login">
        <div className="wrapper__content">
          <h2 className="wrapper__big-heading">Inicia sesión</h2>
          {loginForm.formError && (
            <div className="wrapper__error-container">
              <p className="wrapper__error-message">
                Por favor, corrobora que los datos sean correctos.
              </p>
            </div>
          )}
          <form
            className="wrapper_login-form"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <FormInput
              label="E-mail"
              placeholder="usuario@ejemplo.com"
              onChange={(e) => handleInputChange(e.target.value, 'email')}
            />
            <FormInput
              label="Contraseña"
              onChange={(e) => handleInputChange(e.target.value, 'password')}
              type="password"
            />
            <a className="wrapper__link">¿Olvidaste tu contraseña?</a>
            <Button className="wrapper__submit" type="submit">
              Inciar sesión
            </Button>
          </form>
          <span className="wrapper__create-account">
            ¿No tienes cuenta?{' '}
            <Link href="/sign-up">
              <a className="wrapper__link">Regístrate.</a>
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

                & .wrapper__error-container {
                  background-color: var(--red-100);
                  padding: 12px;
                  border-radius: 8px;

                  & .wrapper__error-message {
                    color: var(--red-200);
                  }
                }
              }

              & .wrapper__link {
                color: var(--action-primary);
                margin: 15px 0;
                display: inline-block;
                font-size: ${pxToRem(18)};
                text-decoration: none;
              }

              & :global(.wrapper__submit) {
                margin-top: 50px;
              }

              & .wrapper__create-account {
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
