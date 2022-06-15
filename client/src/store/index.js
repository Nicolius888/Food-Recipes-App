import {configureStore} from '@reduxjs/toolkit';
// import { applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";


export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

// export const store = configureStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
//check how works configure store new method