import {
  SETUP_USER,
  setupUserFunc,
  UPDATE_USER_PROFILE,
  updateUserProfileFunc,
  userActionTypes,
  UserState
} from "./types";
import {LOGOUT} from "../auth/types";
import {AppThunk} from "../index";

/**
 * Action Creators
 */

export const setupUser: setupUserFunc = function (data) {
  return {
    type: SETUP_USER,
    payload: data
  }
}

export const updateUserProfile: updateUserProfileFunc = function (data) {
  return {
    type: UPDATE_USER_PROFILE,
    payload: data
  }
}


export function updateUserProfileThunk(updatedProfile: any):AppThunk {
  return async dispatch => {
    if (updatedProfile.hasOwnProperty('profile')) {
      dispatch(updateUserProfile(updatedProfile))
    }
  }
}

/**
 * Reducer
 */

const initialState: UserState = {
  settled: false,
  email: '',
  isStaff: false,
  profile: {
    id: '',
    nickname: '',
    portrayedAs: '',
    nicknamePrev: '',
    portrayedAsPrev: '',
    status: 'pending',
    submitted: false
  }
}

export function userReducer(
  state = initialState,
  action: userActionTypes
): UserState {
  switch (action.type) {

    case SETUP_USER:
      return {
        ...state,
        ...action.payload
      }
    case LOGOUT:
      return {
        ...initialState
      }
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}