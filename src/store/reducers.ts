import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/reducers";
import bookingReducer from './booking/reducers';
import notificationReducer from './notification/reducers';
import userReducer from './user/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  notification: notificationReducer,
  user: userReducer,
});

export default rootReducer;
