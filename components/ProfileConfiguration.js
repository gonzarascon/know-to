import React, { useState } from 'react';
import _ from 'lodash';
import Avatar from 'react-avatar';

import { MailOutlined } from '@ant-design/icons';

import { motion } from 'framer-motion';

import { Colors, media } from 'constants';
import { pxToRem } from 'utils/helpers';

import { useUserState } from 'contexts/UserContext';

import IconButton from './IconButton';

export default function ProfileConfiguration() {
  const { userData } = useUserState();

  const [configuration, setConfiguration] = useState({
    isEditing: false,
    editing: null,
  });

  const handleEditButton = (editingItem) => {
    console.log('hola');
    setConfiguration({ isEditing: true, editing: editingItem });
  };

  const finishEditing = () =>
    setConfiguration({ isEditing: false, editing: null });

  const isEditingCurrent = (editingItem) => {
    return (
      configuration.isEditing && _.isEqual(configuration.editing, editingItem)
    );
  };

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
                      ? () => finishEditing()
                      : () => handleEditButton('basic')
                  }
                />
              </div>

              {!isEditingCurrent('basic') && (
                <div className="profile-configuration__input-group">
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
                </div>
              )}
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
          }
        `}
      </style>
    </>
  );
}
