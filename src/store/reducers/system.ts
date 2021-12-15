import { SystemActionsTypes } from "../../types/enums/system";
import { SystemReducerState } from "../../types/interfaces/system_reducer";

const initState = {
    currentRoute: ""
} as SystemReducerState

const systemReducer = (state = initState, action: {type: string, payload: string}) => {
    const {SET_CURRENT_ROUTE} = SystemActionsTypes
    switch (action.type) {
        // set the route name
        case SET_CURRENT_ROUTE: {
            return {
              ...state,
              currentRoute: action.payload,
            };
        }
        default:
        return state;
    }
}
export default systemReducer