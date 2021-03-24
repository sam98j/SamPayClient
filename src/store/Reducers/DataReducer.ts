import {} from "react-redux";
import { set_current_route } from "../actions/types";
import { DataReducerState } from "../../Interfaces/Store";

const initState = {
  currentTransfer: null,
  submitTransfer: false
} as DataReducerState;

export default (
  state: DataReducerState = initState,
  action: any
): DataReducerState => {
  switch (action.type) {
    // set the route name
    case set_current_route:
      return {
        ...state,
        currentRoute: action.payload,
      };
    // set current transfer
    case 'set_current_transfer':
      if(action.payload.error) {
        return {
          ...state,
         currentTransfer: null 
        }
      } else {
        return {
          ...state,
          currentTransfer: {receiver: action.payload.data.receiver}
        }
      }
    // submit transfer
    case "submit_transfer":
      if(!action.payload.error) {
        return {
          ...state,
          currentTransfer: null,
          submitTransfer: true
        }
      }
    default:
      return state;
  }
};
