import { userConstants } from '../constants';
import { alertActions } from './';
import axios from 'axios';

export const userActions = {
  login,
};



function login(username, password) {
  

  return dispatch => {
    dispatch(request({ username }));
    let apiUrl = '';
    axios.post(apiUrl)
      .then(response => {
        let user = {
          access_token: response.data.access_token,
          username: response.data.username
        }
        dispatch(success(user))
      })
      .catch(error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
