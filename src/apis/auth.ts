import { ClientCredentioal, LoginSuccess } from "../types/interfaces/auth_apis";
import {AuthTypes} from '../types/enums/auth'
import { Client } from "../types/interfaces/store";
const api_url = process.env.REACT_APP_API_URL!;

// login client method
export const LoginClient = (Credentioal: ClientCredentioal) => async (dispatch: Function) => {
  const {LOGIN_SUCCESS, LOGIN_FAILD} = AuthTypes;
  // request configuration 
  const config = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(Credentioal),
  };

  // sending data to the server
  const response = await fetch(`${api_url}/auth/login`, config);
  // check for status code
  if(response.status !== 200) {
    dispatch({type: LOGIN_FAILD})
    return
  }
  const loginData = await response.json() as LoginSuccess;
  // response data
  dispatch({type: LOGIN_SUCCESS, payload: loginData})
};
// initate client function
export const InitateClient = () => async (dispatch: Function) => {
  // Auth cases
  const {AUTH_FAILD, AUTH_SUCCESS} = AuthTypes;
  // get the token from the local storage
  const token: string | null = localStorage.getItem("token");
  // check if token is exist
  if (token) {
    // request configuration object
    const config: RequestInit = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };
    // // send request to the server
    const response = await fetch(`${api_url}/auth/initate_client`,config);
    // check for the res status
    if(response.status != 200){
      dispatch({type: AUTH_FAILD})
      return
    }
    // the response come from the server
    const client = await response.json() as Client;
    // dispatch action to the store
    dispatch({type: AUTH_SUCCESS, payload: client})
    return
  }
  dispatch({type: AUTH_FAILD})
};
// logout the client
export const SignOut = () => (dispatch: Function) => {
  const {SIGN_OUT} = AuthTypes;
  dispatch({ type: SIGN_OUT});
};