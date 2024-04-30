import { combineReducers } from 'redux';
import loginReducer from './reducers/auth';
import systemReducer from './reducers/system';
import transactionsReducer from './reducers/transactions';

const rootReducer = combineReducers({
  auth: loginReducer,
  system: systemReducer,
  transactions: transactionsReducer,
});
export default rootReducer;
