import React, { useReducer, useContext, createContext } from 'react';

const dev = process.env.NODE_ENV !== 'production';

const SET_USER = 'SET_USER';
const DELETE_USER = 'DELETE_USER';
const SET_LOADING = 'SET_LOADING';

const UserStateContext = createContext(null);
const UsertDispatchContext = createContext(null);

const initialState = { userData: null, isLoading: false };

export function UserReducer(state, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userData: action.payload.userData,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case DELETE_USER:
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
}

/**
 * Actions
 */
export function setUserAction(userData) {
  if (dev) {
    console.log(SET_USER, userData);
  }

  localStorage.setItem('userData', JSON.stringify(userData));

  return {
    type: SET_USER,
    payload: {
      userData,
    },
  };
}

export function setUserLoading(bool) {
  return {
    type: SET_LOADING,
    payload: {
      isLoading: bool,
    },
  };
}

export function deleteUserAction() {
  return {
    type: DELETE_USER,
  };
}

/**
 * Context Povider
 */
export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  return (
    <UserStateContext.Provider value={state}>
      <UsertDispatchContext.Provider value={dispatch}>
        {children}
      </UsertDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserContextProvider');
  }
  return context;
}

export function useUserDispatch() {
  const context = useContext(UsertDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useUserDispatch must be used within a UserContextProvider'
    );
  }
  return context;
}
