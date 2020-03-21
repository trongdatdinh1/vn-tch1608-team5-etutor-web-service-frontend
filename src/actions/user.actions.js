import { userConstants } from '../constants';


export const userActions = {
  login,
};



function login(username, password) {
  

  return dispatch => {
    dispatch(request({ username }));

    axios.post(apiUrl)
      .then(response => {
        user = {
          access_token: response.data.access_token,
          username: response.data.username
        }
        dispatch(success(user))
      })
      .catch(error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });

    

    // userService.login(username, password)
    //   .then(
    //       user => { 
    //           dispatch(success(user));
    //           history.push('/');
    //       },
    //       error => {
    //           dispatch(failure(error.toString()));
    //           dispatch(alertActions.error(error.toString()));
    //       }
    //   );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
