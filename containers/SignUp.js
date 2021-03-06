import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

import { media } from 'constants';
import { pxToRem, Validate } from 'utils/helpers';

import { Button, FormInput } from 'components';

import { createUser } from 'lib/api/user';

function SignUp() {
  const router = useRouter();
  const [signupForm, setSignupForm] = useState({
    username: null,
    email: null,
    password: null,
    formError: false,
  });

  const [dataAlreadyTaken, setDataAlreadyTaken] = useState(false);

  function checkErrors() {
    if (!Validate('username', signupForm.username)) {
      setSignupForm({ ...signupForm, formError: true });
      return true;
    }

    if (!Validate('email', signupForm.email)) {
      setSignupForm({ ...signupForm, formError: true });
      return true;
    }

    if (!Validate('password', signupForm.password)) {
      setSignupForm({ ...signupForm, formError: true });
      return true;
    }

    return false;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (checkErrors()) {
      return null;
    }

    const { username, email, password } = signupForm;

    await createUser({ username, email, password })
      .then(async (data) => {
        console.log(data);
        setCookie(null, 'auth_token', data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
        localStorage.setItem('userData', JSON.stringify(data.user));

        router.push('/');
      })
      .catch((error) => setDataAlreadyTaken(true));
  }

  function handleInputChange(value, key) {
    setSignupForm({ ...signupForm, [key]: value, formError: false });
    if (dataAlreadyTaken) {
      setDataAlreadyTaken(false);
    }
  }

  return (
    <>
      <section className="wrapper wrapper--login">
        <div className="wrapper__content">
          <h2 className="wrapper__big-heading">Crea una cuenta</h2>
          {signupForm.formError && (
            <div className="wrapper__error-container">
              <p className="wrapper__error-message">
                Por favor, corrobora que los datos sean correctos.
              </p>
            </div>
          )}
          {dataAlreadyTaken && (
            <div className="wrapper__error-container">
              <p className="wrapper__error-message">
                Ya existe un usuario con estas credenciales. <br />
                <Link href="/login">
                  <a>¿Quieres iniciar sesión?</a>
                </Link>
              </p>
            </div>
          )}
          <form
            className="wrapper_login-form"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <FormInput
              label="Nombre de usuario"
              placeholder="Ingresa tu nombre de usuario"
              value={signupForm.username}
              onChange={(e) => handleInputChange(e.target.value, 'username')}
              type="text"
            />
            <span className="wrapper_input-help wrapper_input-help--no-bottom">
              Debe contener entre 6 y 12 caracteres.
            </span>
            <FormInput
              label="E-mail"
              placeholder="usuario@ejemplo.com"
              value={signupForm.email}
              onChange={(e) => handleInputChange(e.target.value, 'email')}
              type="email"
            />
            <FormInput
              label="Contraseña"
              placeholder="Ingresa una contraseña"
              type="password"
              value={signupForm.password}
              onChange={(e) => handleInputChange(e.target.value, 'password')}
            />
            <span className="wrapper_input-help">
              Tu contraseña debe contener mínimo 6 caracteres.
            </span>
            <Button className="wrapper_submit" type="submit">
              Crear cuenta
            </Button>
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
                  width: 60%;
                }
                @media ${media.largeDevice} {
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

              & .wrapper_input-help {
                margin: 10px 0;
                display: inline-block;
                margin-left: 5px;

                &--no-bottom {
                  margin-bottom: 0;
                }
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
