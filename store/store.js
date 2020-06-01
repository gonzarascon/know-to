import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import rootReducer from './ducks';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };

      return nextState;
    case 'CLIENT_SERVER':
      return {
        ...state,
        server: {
          ...state.server,
          tick: action.payload,
        },
      };
    case 'CLIENT_ACTION':
      return {
        ...state,
        client: {
          ...state.client,
          tick: action.payload,
        },
      };
    default:
      return rootReducer(state, action);
  }
};

// create a makeStore function
const makeStore = (context) => createStore(reducer, bindMiddleware([logger]));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
