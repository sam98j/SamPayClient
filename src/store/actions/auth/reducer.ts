import { Client } from "../../interface";
import {AuthReducerState, AuthFaild, AuthSuccess } from "./interfaces";
import {sign_out} from "./types";

const initState = {
  isLogged: null,
  client: null,
} as AuthReducerState;

export default (state: AuthReducerState = initState,action: {type: string, payload: {error: Boolean, data: any}}): AuthReducerState => {
  switch (action.type) {
    // initate client procces is succeed
    case "authentecate":

      if (action.payload.error) {
        return {
          isLogged: false,
          client: null,
        };
      } else {
        return {
          isLogged: true,
          client: action.payload.data.currentClient!
        }
      }
   
    case sign_out:
      localStorage.setItem("token", "");
      return {
        isLogged: false,
        client: null,
      };

    case "login":
      if (!action.payload.error) {
        const token: string = `Bearer ${action.payload.data.token!}`;
        localStorage.setItem("token", token);
        return {
          ...state,
          isLogged: true,
          client: action.payload.data.currentClient!,
        };
      } else {
        return {
          isLogged: false,
          client: null
        }
      }

    case "clientLogged":
      return {
        ...state,
        isLogged: true,
      };
    
    case "transfer_money":
      return {
        ...state,
        client: action.payload.data
      }

    case "submit_transfer": 
      if(!action.payload.error) {
        return {
          ...state,
          client: {...state.client!, account: {balance: action.payload.data.newBalance} }
        }
      }
    default:
      return state;
  }
};
