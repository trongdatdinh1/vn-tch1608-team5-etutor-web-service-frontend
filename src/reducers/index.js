import { combineReducers } from 'redux';

import { authentication } from './authentication.reducers';
import { alert } from './alert.reducers';

const rootReducer = combineReducers({
  authentication,
  alert,
  name: 'shika'
});

export default rootReducer;