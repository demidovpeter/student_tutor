/**
 * Action Creators
 */
import {
  AuthActionTypes,
  AuthState,
  logoutFunc,
  Token,
  SET_TOKEN,
  LOGOUT,
  TOKEN_INVALID,
  TOKEN_KEY,
  TOKEN_VALID
} from "./types";
import {AppThunk} from "../index";
import {setupUser} from "../user";
import {history} from '../../index'

function setToken(token: Token): AuthActionTypes {
  return {
    type: SET_TOKEN,
    payload: token
  }
}

function tokenInvalid(): AuthActionTypes {
  return {type: TOKEN_INVALID,}
}

export const logoutUser: logoutFunc = function () {
  return {
    type: LOGOUT
  }
}

function tokenValid(): AuthActionTypes {
  return {type: TOKEN_VALID,}
}

export function logoutUserThunk(): AppThunk {
  return async dispatch => {
    localStorage.removeItem(TOKEN_KEY)
    dispatch(logoutUser())
  }
}

export function loginUserThunk(userData: any): AppThunk {
  return async dispatch => {
    const isSuccess = userData.success
    const token = userData.token
    if (isSuccess) {
      /** Auth passed */
      localStorage.setItem(TOKEN_KEY, token)
      dispatch(setToken(token))
      /** Setup user data */
      const settled = true
      const email = userData.user.email
      const isStaff = userData.user.isStaff
      const profile = userData.user.profile
      dispatch(setupUser({settled, email, isStaff, profile}))
    }
  }
}

export function registerUserThunk(userData: any): AppThunk {
  return async dispatch => {

    const isSuccess = userData.success
    const token = userData.token
    if (isSuccess) {
      /** Auth passed */
      localStorage.setItem(TOKEN_KEY, token)
      dispatch(setToken(token))
    }
  }
}

export function setupUserThink(me: any): AppThunk {
  return async dispatch => {
    if (!me) {
      localStorage.removeItem(TOKEN_KEY)
      dispatch(logoutUser())
      history.push('/login')
    } else {
      /** Setup user data */
      const settled = true
      const email = me.email
      const isStaff = me.isStaff
      const profile = me.profile
      dispatch(setupUser({settled, email, isStaff, profile}))
    }
  }
}

export function checkTokenThunk(verifyToken: any): AppThunk {
  return async (
    dispatch
  ) => {
    if (verifyToken.success) {
      dispatch(tokenValid())
    } else {
      dispatch(tokenInvalid())

    }
  }
}

/**
 * Reducer
 */


const initialState: AuthState = {
  tokenChecked: false,
  tokenValid: false,
  token: localStorage.getItem(TOKEN_KEY),
}

export function authReducer(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case TOKEN_VALID:
      return {
        ...state,
        tokenChecked: true,
        tokenValid: true
      }
    case TOKEN_INVALID:
      return {
        ...state,
        tokenChecked: true,
        token: null
      }
    case SET_TOKEN:
      return {
        tokenValid: true,
        tokenChecked: true,
        token: action.payload
      }
    case LOGOUT:
      return {
        tokenChecked: false,
        tokenValid: false,
        token: null
      }
    default:
      return state
  }
}











