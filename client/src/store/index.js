import { configureStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = configureStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
//check how works configure store new method