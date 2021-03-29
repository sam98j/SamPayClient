import { AuthSuccess, AuthFaild, ClientCredentioal, LoginSuccess } from "./interfaces";
import {sign_out} from "./types";

export class AuthActions {
    // login client method
    static LoginClient = (Credentioal: ClientCredentioal) => async (dispatch: Function) => {
      // request configuration 
      const config = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(Credentioal),
      };
  
      // sending data to the server
      const DataPending = await fetch("http://localhost:2000/auth/login", config);
      // response data
      const ResData: LoginSuccess | AuthFaild = await DataPending.json();

      dispatch({type: "login", payload: ResData})

    };
    // initate client function
    static InitateClient = () => async (dispatch: Function) => {
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
        const DataPending = await fetch("http://localhost:2000/auth/initate_client",config);
        // the response come from the server
        const ResData: AuthSuccess | AuthFaild = await DataPending.json();
        // if an error accure 
        if(ResData.error) {
          // token exist and it's not valid
          // get client faild data
          const authData: AuthFaild = {error: true, data: "Token not valid"};
          // send the response data to the authReducer
          dispatch({type: "authentecate", payload: authData})
        } else {
          // response come back and token is valid
          // send the response data to the reducer
          dispatch({type: "authentecate", payload: ResData})
        }
      } else {
        // token not found and then will send domy data to the reducer
        const AuthData: AuthFaild = {error: true, data: "token not found"}
        // send data to the authReducer
        dispatch({ type: "authentecate", payload: AuthData });
      }
    };
    // logout the client
    static SignOut = () => (dispatch: (action: any) => void) => {
      dispatch({ type: sign_out });
    };
    // this is a functions that i dont care about
    static LoggingClient = () => (dispatch: (action: any) => void) => {
      dispatch({ type: "clientLogged" });
    };
  }