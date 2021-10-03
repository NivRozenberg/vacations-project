import { composeWithDevTools } from 'redux-devtools-extension';
// export default store;

// // Redux three operations using single reducer: 
// // 1. Get State: store.getState().products
// // 2. Subscribe: store.subscribe(...)
// // 3. Dispatch: store.dispatch(...)


// -------------------------------------------------------------------------------------------------


// Multiple Reducers: 

import { combineReducers, createStore } from "redux";
// // import { shopReducer } from "./ShopsState";
import { vacationReducer } from './VacationsState';
import { authReducer } from './AuthState';
import { usersReducer } from './UsersState'


const reducers = combineReducers({ vacationsState: vacationReducer, usersState: usersReducer, authState: authReducer });
// // const store = createStore(reducers);

const store = createStore(reducers, composeWithDevTools());

export default store;