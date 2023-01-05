import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Reducers
import { getAllPartnersReducer } from "./reducers/partnerReducer";
import { getAuthReducer } from "./reducers/authReducer";

const reducer = combineReducers({
  getPartners: getAllPartnersReducer,
  getAuth: getAuthReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;