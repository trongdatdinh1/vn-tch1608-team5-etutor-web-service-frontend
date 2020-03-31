import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import {loadState, saveState} from '../components/utils/LocalStorage';

const persistedState = loadState();



export const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(
        thunkMiddleware,
    )
);

store.subscribe(() => {
    saveState({
      authentication: store.getState().authentication
    });
  });