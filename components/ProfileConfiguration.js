import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import Avatar from 'react-avatar';

import SVG from 'react-inlinesvg';
import { MailOutlined } from '@ant-design/icons';

import { motion } from 'framer-motion';

import { Colors, media } from 'constants';
import { pxToRem, Validate } from 'utils/helpers';

import { updateAvatar, updateUserData } from 'lib/api/user';

import {
  useUserState,
  useUserDispatch,
  setUserLoading,
  setUserAction,
} from 'contexts/UserContext';

import {
  useProfileConfigurationDispatch,
  setProfileConfigurationAction,
} from 'contexts/ProfileConfigurationContext';

import IconButton from './IconButton';

export default function ProfileConfiguration() {
  const { userData, isLoading } = useUserState();
  const userDispatch = useUserDispatch();
  const profileDispatch = useProfileConfigurationDispatch();

  const [configuration, setConfiguration] = useState({
    isEditing: false,
    editing: null,
  });

  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    user_photo: userData.foto_de_perfil ? userData.foto_de_perfil.url : null,
    new_photo: null,
  });

  const [formErrors, setFormErrors] = useState({
    username: false,
    email: false,
    new_photo: false,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      username: userData.username,
      email: userData.email,
      user_photo: userData.foto_de_perfil ? userData.foto_de_perfil.url : null,
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

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });

    setFormErrors({
      ...formErrors,
      [key]: false,
    });
    return null;
  };

  const submitBasicInformation = async () => {
    const newUserData = {
      ...userData,
      username: formData.username,
    };

    userDispatch(setUserLoading(true));
    if (formData.new_photo) {
      await updateAvatar({ photo: formData.new_photo[0], user_id: userData.id })
        .then(() => {
          setFormData({
            ...formData,
            new_photo: null,
          });
        })
        .catch(() => {
          setFormData({
            ...formData,
            user_photo: userData.foto_de_perfil
              ? userData.foto_de_perfil.url
              : null,
          });
        });
    }

    if (
      !Validate('username', formData.username) &&
      _.isEmpty(formData.username)
    ) {
      userDispatch(setUserLoading(false));
      setFormErrors({ ...formErrors, username: true });
      return null;
    }

    if (!_.isEqual(newUserData, userData)) {
      await updateUserData({ userData: newUserData }).then((response) =>
        userDispatch(setUserAction(response))
      );
    }
    finishEditing();
    userDispatch(setUserLoading(false));
  };

  const submitSecurityInformation = async () => {
    const newUserData = {
      ...userData,
      email: formData.email,
    };

    userDispatch(setUserLoading(true));

    if (!Validate('email', formData.email) && _.isEmpty(formData.email)) {
      setFormErrors({ ...formErrors, email: true });
      return;
    }

    if (!_.isEqual(newUserData, userData)) {
      await updateUserData({ userData: newUserData }).then((response) =>
        userDispatch(setUserAction(response))
      );
    }

    finishEditing();
    userDispatch(setUserLoading(false));
  };

  const closeModal = () => {
    profileDispatch(setProfileConfigurationAction(false));
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
            onClick={() => closeModal()}
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
                        }
                      : () => handleEditButton('basic')
                  }
                />
              </div>

              <div className="profile-configuration__input-group">
                {!isEditingCurrent('basic') && (
                  <>
                    <Avatar
                      src={
                        userData.foto_de_perfil
                          ? userData.foto_de_perfil.url
                          : null
                      }
                      name={formData.username}
                      alt={formData.username}
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
                        name={formData.username}
                        alt={formData.username}
                        round
                        size="55px"
                        className="profile-configuration__avatar"
                      />
                    </div>
                    <input
                      value={formData.username}
                      className={`profile-configuration__username-input ${
                        formErrors.username && 'has-errors'
                      }`}
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
                      ? () => {
                          submitSecurityInformation();
                        }
                      : () => handleEditButton('security')
                  }
                />
              </div>
              <div className="profile-configuration__input-group">
                {!isEditingCurrent('security') && (
                  <>
                    <MailOutlined />
                    <span
                      className={`profile-configuration__username ${
                        formErrors.email && 'has-errors'
                      }`}
                    >
                      {userData.email}
                    </span>
                  </>
                )}
                {isEditingCurrent('security') && (
                  <>
                    <MailOutlined />
                    <input
                      value={formData.email}
                      className="profile-configuration__username-input"
                      placeholder="Ingresa un email"
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                    />
                  </>
                )}
              </div>
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
              min-height: 50vh;
              width: 100%;
              max-width: 600px;
              display: flex;
              flex-direction: column;
              padding: 20px 25px;
              border-radius: 10px;

              @media ${media.mediumDevice} {
                height: 45vh;
                padding-left: 50px;
              }
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

              &.has-errors {
                border-color: var(--red-100);
              }
            }
          }
        `}
      </style>
    </>
  );
}
