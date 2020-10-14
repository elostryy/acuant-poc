import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { persistCombineReducers } from 'redux-persist';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { config } from './config';

/**
 * cardType: 1 for ID/Passport, 2 for Medicard
 */
const initialState = {
  config: {
    instanceID: 'efddecc1-5b38-4424-af2c-0e7aaee58c49',
    frontSubmitted: false,
    backSubmitted: false,
  },
  processedData: {
    faceMatch: null,
    result: null,
  },
  idProperties: {
    cardType: 0,
    orientation: 0,
    sidesLeft: 2,
  },
  captureProperties: {
    image: {
      data: '',
      width: 0,
      height: 0,
    },
    glare: -1,
    sharpness: -1,
  },
};

export const history = createHistory({
  basename: config.REACT_APP_BASENAME,
});

const stateConfig = {
  key: 'idscango',
  storage,
  blacklist: ['config', 'processedData', 'idProperties', 'captureProperties'],
};

const reducer = persistCombineReducers(stateConfig, rootReducer);

function configureStore() {
  const store = createStore(
    connectRouter(history)(reducer),
    initialState,
    applyMiddleware(thunk, routerMiddleware(history))
  );
  return store;
}

export const store = configureStore();
