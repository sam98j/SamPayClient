import { SystemActionsTypes } from "../types/enums/system";

export const SetCurrentRoute = (routeName: string) => (dispatch: Function) => {
  const {SET_CURRENT_ROUTE} = SystemActionsTypes;
  dispatch({ type: SET_CURRENT_ROUTE, payload: routeName });
};