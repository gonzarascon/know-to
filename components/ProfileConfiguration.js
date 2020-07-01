import React from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

import { CloseOutlined } from '@ant-design/icons';

import { Colors } from 'constants';
import { pxToRem } from 'utils/helpers';

export default function ProfileConfiguration() {
  return (
    <>
      <motion.div className="profile-configuration">
        <div className="profile-configuration__modal">
          <button className="profile-configuration__close-button">
            <CloseOutlined className="profile-configuration__close" />
          </button>
          <h3 className="profile-configuration__title">Mi cuenta</h3>
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

            & .profile-configuration__modal {
              background-color: var(--dark-blue-200);
              height: 45vh;
              width: 100%;
              max-width: 600px;
              display: flex;
              flex-direction: column;
              padding: 20px;
              border-radius: 10px;
              padding-left: 50px;

              & .profile-configuration__close-button {
                align-self: flex-end;
                background-color: transparent;
                border: none;
                outline: 0;
                color: white;
                width: 40px;
                height: 40px;

                border-radius: 100%;

                font-size: ${pxToRem(25)};

                @media (hover: hover) {
                  &:hover {
                    cursor: pointer;
                    background-color: var(--action-primary);
                  }
                }
              }

              & .profile-configuration__title {
                font-family: var(--f-Rubik);
                color: var(--white);
                font-size: ${pxToRem(30)};
              }
            }
          }
        `}
      </style>
    </>
  );
}
