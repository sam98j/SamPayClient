import {AuthTypes} from '../../types/enums/auth'
import { TransTypes } from '../../types/enums/transactions';
import { LoginSuccess } from "../../types/interfaces/auth_apis";
import { AuthReducerState } from '../../types/interfaces/auth_reducer';
import { Client } from '../../types/interfaces/store';
import { ReceiveMoneyNotification, SubmitTransferRes } from '../../types/interfaces/trans_apis';

const initState = {
  isLogged: null,
  client: null,
} as AuthReducerState;

const loginReducer = (state = initState,action: {type: string, payload: any}): AuthReducerState => {
  const {LOGIN_SUCCESS, LOGIN_FAILD, SIGN_OUT, AUTH_FAILD, AUTH_SUCCESS} = AuthTypes;
  const {SUBMIT_TRANSFER, RECEIVE_MONEY} = TransTypes;
  switch (action.type) {
    // initate client procces is succeed
    case LOGIN_SUCCESS: {
      const {token, client} = action.payload as LoginSuccess;
      // store token in the local storage
      localStorage.setItem("token", `Bearer ${token}`)
      return {
        isLogged: true,
        client
      }
    }
    // in case of login faild
    case LOGIN_FAILD: {
      return {
        isLogged: false,
        client: null,
      };
    }
    // client sign out
    case SIGN_OUT: {
      localStorage.setItem("token", "");
      return {
        isLogged: false,
        client: null,
      };
    }
    // in case of auth faild
    case AUTH_FAILD: {
      return {
        ...state,
        isLogged: false
      }
    }
    // in case of auth success
    case AUTH_SUCCESS: {
      const client = action.payload as Client
      return {
        isLogged: true,
        client: {
          ...client,
          transactionsHistory: client.transactionsHistory.reverse()
        },
      }
    }
    case SUBMIT_TRANSFER: {
      const {newBalance, newTransaction} = action.payload as SubmitTransferRes;
      const transHistory = [newTransaction, ...state.client?.transactionsHistory!]
      return {
        ...state,
        client: {...state.client!, account: {balance: newBalance}, transactionsHistory: transHistory }
      }
    }
    // Receive Money
    case RECEIVE_MONEY: {
      const {updatedBalance} = action.payload as ReceiveMoneyNotification
      return {
        ...state,
        client: {
          ...state.client!,
          account: {
            balance: updatedBalance!
          }
        }
      }
    }
    default:
      return state;
  }
};
export default loginReducer