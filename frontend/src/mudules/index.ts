import {combineReducers} from "redux";
import { ThunkAction } from "redux-thunk";
import { Action } from 'redux'
import {authReducer} from "./auth";
import {userReducer} from "./user";
import {dashboardReducer} from "./dashboard";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  dash: dashboardReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export default rootReducer;
