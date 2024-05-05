import { ClientCredentioal, LoginSuccess } from '../types/interfaces/auth_apis';
import { AuthTypes } from '../types/enums/auth';
import { Client } from '../types/interfaces/store';
import { NewClientRegestrationData } from '../pages/SignUp/interface';
import { uploadProfileImg } from './filesUplaod';
const api_url = process.env.REACT_APP_API_URL!;

// login client method
export const LoginClient = (Credentioal: ClientCredentioal) => async (dispatch: Function) => {
  const { LOGIN_SUCCESS, LOGIN_FAILD } = AuthTypes;
  // request configuration
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(Credentioal),
  };

  // sending data to the server
  const response = await fetch(`${api_url}/auth/login`, config);
  // check for status code
  if (response.status === 400) {
    dispatch({ type: LOGIN_FAILD, payload: 'Client Not Exist' });
    return;
  }
  // server error
  if (response.status >= 500) {
    dispatch({ type: LOGIN_FAILD, payload: 'Server Error!!!' });
    return;
  }
  const loginData = (await response.json()) as LoginSuccess;
  // response data
  dispatch({ type: LOGIN_SUCCESS, payload: loginData });
};
// Login With Google
export const LoginWithGoogle = (data: { googleTokenId: string }) => async (dispatch: Function) => {
  const { LOGIN_SUCCESS, LOGIN_FAILD } = AuthTypes;
  const reqInit = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  } as RequestInit;
  // fetch
  const response = await fetch(`${api_url}/auth/login_with_google`, reqInit);
  // check for status code
  if (response.status === 400) {
    dispatch({
      type: LOGIN_FAILD,
      payload: 'Sorry, No Account Acosieated With Email!!',
    });
    return;
  }
  // handleing server error
  if (response.status >= 500) {
    console.log('unHundiled server error');
    return;
  }
  const loginData = (await response.json()) as LoginSuccess;
  // response data
  dispatch({ type: LOGIN_SUCCESS, payload: loginData });
};
// initate client function
export const InitateClient = () => async (dispatch: Function) => {
  // Auth cases
  const { AUTH_FAILD, AUTH_SUCCESS } = AuthTypes;
  // get the token from the local storage
  const token: string | null = localStorage.getItem('token');
  // check if token is exist
  if (token) {
    // request configuration object
    const config: RequestInit = {
      method: 'GET',
      headers: {
        authorization: token,
      },
    };
    // // send request to the server
    const response = await fetch(`${api_url}/auth/initate_client`, config);
    // check for the res status
    if (response.status != 200) {
      dispatch({ type: AUTH_FAILD });
      return;
    }
    // the response come from the server
    const client = (await response.json()) as Client;
    // dispatch action to the store
    dispatch({ type: AUTH_SUCCESS, payload: client });
    return;
  }
  dispatch({ type: AUTH_FAILD });
};
// logout the client
export const SignOut = () => (dispatch: Function) => {
  const { SIGN_OUT } = AuthTypes;
  dispatch({ type: SIGN_OUT });
};
// Sign UP With Google
export const signUpWithGoogle = (data: { googleTokenId: string }) => async (dispatch: Function) => {
  const { LOGIN_SUCCESS, LOGIN_FAILD } = AuthTypes;
  const reqInit = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  } as RequestInit;
  // fetch
  const response = await fetch(`${api_url}/auth/signup_with_google`, reqInit);
  // check for status code
  if (response.status === 400) {
    dispatch({
      type: LOGIN_FAILD,
      payload: 'Sorry, User is Already Exist!!',
    });
    return;
  }
  // handleing server error
  if (response.status >= 500) {
    console.log('unHundiled server error');
    return;
  }
  const loginData = (await response.json()) as LoginSuccess;
  // response data
  dispatch({ type: LOGIN_SUCCESS, payload: loginData });
};
// clear auth error message
export const clearAuthErrMsg = () => (dispatch: Function) => {
  dispatch({ type: AuthTypes.CLEAR_AUTH_Err_MSG });
};
// login client method
export const signUp = (data: FormData) => async (dispatch: Function) => {
  const { LOGIN_SUCCESS, LOGIN_FAILD } = AuthTypes;
  // request configuration
  try {
    // api config object
    const config = { method: 'POST', body: data };
    // sending data to the server
    const response = await fetch(`${api_url}/auth/signup`, config);
    // check for status code
    if (response.status === 400) {
      dispatch({ type: LOGIN_FAILD, payload: 'Client Exist' });
      return;
    }
    // server error
    if (response.status >= 500) {
      dispatch({ type: LOGIN_FAILD, payload: 'Server Error!!!' });
      return;
    }
    const loginData = (await response.json()) as LoginSuccess;
    // response data
    dispatch({ type: LOGIN_SUCCESS, payload: loginData });
  } catch (err) {
    console.log(err);
  }
};
