import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Reducers
import { getAllPartnersReducer } from "./reducers/partnerReducer";
import { getAuthReducer } from "./reducers/authReducer";
import { getAllRolesReducer } from "./reducers/roleReducer";
import { getAllAppsReducer } from "./reducers/appReducer";
import { getAllFunctionsReducer } from "./reducers/functionReducer";
import { getAllUsersReducer } from "./reducers/userReducer";
import { getLoginReducer } from "./reducers/loginReducer";

const reducer = combineReducers({
  getPartners: getAllPartnersReducer,
  getAuth: getAuthReducer,
  getRoles: getAllRolesReducer,
  getApps: getAllAppsReducer,
  getFunctions: getAllFunctionsReducer,
  getUsers: getAllUsersReducer,
  getLogin: getLoginReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;