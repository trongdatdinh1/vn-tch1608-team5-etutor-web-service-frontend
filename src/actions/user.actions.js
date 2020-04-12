import { userConstants } from '../constants';
import { alertActions } from './';
import axios from 'axios';
import {BASEURL} from '../constants/baseurl'; 
import { history } from '../helpers/history';

export const userActions = {
  login,
};



function login(username, password){
  
  console.log('Yea shit')
  return dispatch => {
    dispatch(request({ username }));
    const headers = {
      'Content-Type': 'application/json',
    }
    const loginParams = {
      usernameOrEmail: username,
      password: password
    }
    axios.post(`${BASEURL}/api/auth/signin`, loginParams, headers)
      .then(response => {
        console.log('Come user action');
        let user = {
          accessToken: response.data.accessToken,
          userRole: response.data.role,
          id: response.data.id
        }
        console.log(user);
        dispatch(success(user));
        if(response.data.role == 'ROLE_TUTOR'){
          history.push('/tutor_dashboard');
        } else {
          history.push('/staff_dashboard');
        }
      })
      .catch(error => {
        console.log('Catch in user action')
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
