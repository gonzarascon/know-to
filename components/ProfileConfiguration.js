import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Avatar from 'react-avatar';
import { parseCookies } from 'nookies';

import SVG from 'react-inlinesvg';
import { MailOutlined } from '@ant-design/icons';

import { motion } from 'framer-motion';

import { Colors, media } from 'constants';
import { pxToRem } from 'utils/helpers';

import {
  useUserState,
  useUserDispatch,
  setUserLoading,
  setUserAction,
} from 'contexts/UserContext';

import { fetchWithAxios } from 'utils/helpers';

import IconButton from './IconButton';

export default function ProfileConfiguration() {
  const { userData, isLoading } = useUserState();
  const { auth_token } = parseCookies();
  const userDispatch = useUserDispatch();

  const [configuration, setConfiguration] = useState({
    isEditing: false,
    editing: null,
  });

  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    user_photo: userData.foto_de_perfil.url,
    new_photo: null,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      username: userData.username,
      email: userData.email,
      user_photo: userData.foto_de_perfil.url,
    });
  }, [userData]);

  const handleEditButton = (editingItem) => {
    setConfiguration({ isEditing: true, editing: editingItem });
  };

  const finishEditing = () =>
    setConfiguration({ isEditing: false, editing: null });

  const isEditingCurrent = (editingItem) => {
    return (
      configuration.isEditing && _.isEqual(configuration.editing, editingItem)
    );
  };

  const handleInputChange = (key, value) =>
    setFormData({
      ...formData,
      [key]: value,
    });

  const submitBasicInformation = async () => {
    const newUserData = {
      ...userData,
      username: formData.username,
    };

    userDispatch(setUserLoading(true));
    if (formData.new_photo) {
      let fD = new FormData();

      fD.append('files', formData.new_photo[0]);
      fD.append('refId', userData.id);
      fD.append('ref', 'user');
      fD.append('source', 'users-permissions');
      fD.append('field', 'foto_de_perfil');

      await fetchWithAxios({
        model: `upload`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
        body: fD,
      })
        .then(() => {
          setFormData({
            ...formData,
            new_photo: null,
          });
        })
        .catch((error) => {
          setFormData({
            ...formData,
            user_photo: userData.foto_de_perfil.url,
          });
          console.error(error);
        });
    }

    if (!_.isEqual(newUserData, userData)) {
      await fetchWithAxios({
        model: `users/${userData.id}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
        body: newUserData,
      }).then((response) => userDispatch(setUserAction(response)));
    }

    userDispatch(setUserLoading(false));
  };

  if (isLoading) {
    return (
      <>
        <motion.div className="profile-configuration">
          <div className="profile-configuration__modal">
            <SVG src="/images/svg/loading-bars.svg" title="Cargando" />
          </div>
        </motion.div>
        <style jsx>
          {`
            :global(.profile-configuration) {
              position: fixed;
              width: 100vw;
              height: 100vh;
              background-color: ${Colors.black.setAlpha(0.7).toCSS()};
              top: 0;
              right: 0;
              z-index: 10;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 15px;
            }
            .profile-configuration {
              &__modal {
                background-color: var(--dark-blue-200);
                height: 45vh;
                width: 100%;
                max-width: 600px;
                display: flex;
                flex-direction: column;
                padding: 20px;
                border-radius: 10px;
              }
            }
          `}
        </style>
      </>
    );
  }

  return (
    <>
      <motion.div className="profile-configuration">
        <div className="profile-configuration__modal">
          <IconButton
            icon="CloseOutlined"
            className="profile-configuration__close-button"
          />
          <form className="profile-configuration__form">
            <h3 className="profile-configuration__title">Mi cuenta</h3>
            <section>
              <div className="profile-configuration__part-title">
                <h4 className="profile-configuration__title-heading">
                  Información básica
                </h4>
                <IconButton
                  icon={
                    isEditingCurrent('basic') ? 'CheckOutlined' : 'EditOutlined'
                  }
                  width="30px"
                  height="30px"
                  onClick={
                    isEditingCurrent('basic')
                      ? () => {
                          submitBasicInformation();
                          finishEditing();
                        }
                      : () => handleEditButton('basic')
                  }
                />
              </div>

              <div className="profile-configuration__input-group">
                {!isEditingCurrent('basic') && (
                  <>
                    <Avatar
                      src={userData.foto_de_perfil.url}
                      title={userData.username}
                      alt={userData.username}
                      round
                      size="55px"
                      className="profile-configuration__avatar"
                    />
                    <span className="profile-configuration__username">
                      {userData.username}
                    </span>
                  </>
                )}
                {isEditingCurrent('basic') && (
                  <>
                    <div className="profile-configuration__avatar-container">
                      <input
                        type="file"
                        className="profile-configuration__avatar-input"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            new_photo: [...e.target.files],
                            user_photo: URL.createObjectURL(e.target.files[0]),
                          })
                        }
                      />
                      <Avatar
                        src={formData.user_photo}
                        title={formData.username}
                        alt={formData.username}
                        round
                        size="55px"
                        className="profile-configuration__avatar"
                      />
                    </div>
                    <input
                      value={formData.username}
                      className="profile-configuration__username-input"
                      placeholder="Ingresa un nombre de usuario"
                      onChange={(e) =>
                        handleInputChange('username', e.target.value)
                      }
                    />
                  </>
                )}
              </div>
            </section>
            <section>
              <div className="profile-configuration__part-title">
                <h4 className="profile-configuration__title-heading">
                  Contacto
                </h4>
                <IconButton
                  icon={
                    isEditingCurrent('security')
                      ? 'CheckOutlined'
                      : 'EditOutlined'
                  }
                  width="30px"
                  height="30px"
                  onClick={
                    isEditingCurrent('security')
                      ? () => finishEditing()
                      : () => handleEditButton('security')
                  }
                />
              </div>
              {!isEditingCurrent('security') && (
                <div className="profile-configuration__input-group">
                  <MailOutlined />
                  <span className="profile-configuration__username">
                    {userData.email}
                  </span>
                </div>
              )}
            </section>
          </form>
        </div>
      </motion.div>
      <style jsx>
        {`
          :global(.profile-configuration) {
            position: fixed;
            width: 100vw;
            height: 100vh;
            background-color: ${Colors.black.setAlpha(0.7).toCSS()};
            top: 0;
            right: 0;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px;

            & :global(.profile-configuration__close-button) {
              align-self: flex-end;
            }

            & :global(.profile-configuration__avatar) {
              object-fit: cover;
              object-position: center;
            }
          }

          .profile-configuration {
            &__modal {
              background-color: var(--dark-blue-200);
              height: 45vh;
              width: 100%;
              max-width: 600px;
              display: flex;
              flex-direction: column;
              padding: 20px;
              border-radius: 10px;
              padding-left: 50px;
            }

            &__form {
              display: flex;
              flex-direction: column;
            }

            &__title {
              font-family: var(--f-Rubik);
              color: var(--white);
              font-size: ${pxToRem(30)};
            }

            &__part-title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 20px 0;

              @media ${media.mediumDevice} {
                width: 50%;
              }
            }

            &__title-heading {
              font-size: ${pxToRem(23)};
              font-weight: var(--f-regular);
            }

            &__input-group {
              display: flex;
              flex-direction: row;
              align-items: center;
            }

            &__username {
              margin-left: 20px;
              font-size: ${pxToRem(20)};
            }

            &__avatar-container {
              position: relative;
              &::before {
                content: 'Editar';
                display: flex;
                background-color: rgba(0, 0, 0, 0.75);
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                position: absolute;
                border-radius: 100%;
                opacity: 0;
              }

              @media (hover: hover) {
                &:hover {
                  &::before {
                    opacity: 1;
                  }
                  cursor: pointer;
                }
              }
            }

            &__avatar-input {
              opacity: 0;
              position: absolute;
              width: 100%;
              height: 100%;
            }

            &__username-input {
              border: none;
              outline: 0;
              padding: 10px;
              border-bottom: solid 1px var(--action-primary);
              background: transparent;
              margin-left: 20px;
              color: white;
              font-size: ${pxToRem(20)};
              padding-left: 0;
            }
          }
        `}
      </style>
    </>
  );
}
