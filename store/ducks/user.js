import { createDuck } from 'redux-duck';

const userDuck = createDuck('userDuck');

// Action Types
const SET_PROFILE_DATA = userDuck.defineType('SET_PROFILE_DATA');

//Action Creators
const setProfileData = (user) => ({
  type: SET_PROFILE_DATA,
  user,
});

const setUpdateProfileData = (user) => ({
  type: SET_PROFILE_DATA,
  user,
});

// export const getProfileData = ({ token, user_id }) => async (dispatch) => {
//   try {
//     //
//     const response = await User.getProfileData({ token, user_id });
//     if (response.status === 0) {
//       throw new Error('Error al obtener la información del usuario.');
//     }
//     const { data } = response;
//     dispatch(setProfileData(data));
//   } catch (error) {
//     // TODO: handle error
//     console.error(error);
//   }
// };

// export const updateProfileData = ({ token, user_id, profile }) => async (
//   dispatch
// ) => {
//   try {
//     const response = await User.updateProfileData({
//       token,
//       user_id,
//       new_profile: profile,
//     });

//     if (response.status === 0) {
//       toaster.danger('Error al actualizar el perfil');
//     } else {
//       toaster.success('Perfil actualizado exitósamente');
//       const { data } = response;

//       dispatch(setUpdateProfileData(data));
//     }
//   } catch (error) {
//     console.error('updateProfileData', error);
//   }
// };

// Reducers & InitialState
const initialState = {
  username: null,
  email: null,
  foto: null,
};

export default userDuck.createReducer(
  {
    [SET_PROFILE_DATA]: (state, action) => {
      const { user } = action;
      const update = {
        username: user.username,
        email: user.email,
        foto: user.foto,
      };

      return Object.assign({}, state, { ...update });
    },
  },
  initialState
);
