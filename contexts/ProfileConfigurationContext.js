import React, { useReducer, useContext, createContext } from 'react';

const SET_PROFILE_CONFIGURATION = 'SET_PROFILE_CONFIGURATION';

const ProfileConfigurationStateContext = createContext(null);
const ProfileConfigurationDispatchContext = createContext(null);

const initialState = { visible: false };

export function ProfileConfigurationReducer(state, action) {
  switch (action.type) {
    case SET_PROFILE_CONFIGURATION:
      return {
        ...state,
        visible: action.payload.visible,
      };
    default:
      return state;
  }
}

/**
 * Actions
 */
export function setProfileConfigurationAction(bool) {
  return {
    type: SET_PROFILE_CONFIGURATION,
    payload: {
      visible: bool,
    },
  };
}

/**
 * Context Povider
 */
export function ProfileConfigurationContextProvider({ children }) {
  const [state, dispatch] = useReducer(
    ProfileConfigurationReducer,
    initialState
  );
  return (
    <ProfileConfigurationStateContext.Provider value={state}>
      <ProfileConfigurationDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileConfigurationDispatchContext.Provider>
    </ProfileConfigurationStateContext.Provider>
  );
}

export function useProfileConfigurationState() {
  const context = useContext(ProfileConfigurationStateContext);
  if (context === undefined) {
    throw new Error(
      'useProfileConfigurationState must be used within a ProfileConfigurationContextProvider'
    );
  }
  return context;
}

export function useProfileConfigurationDispatch() {
  const context = useContext(ProfileConfigurationDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useProfileConfigurationDispatch must be used within a ProfileConfigurationContextProvider'
    );
  }
  return context;
}
