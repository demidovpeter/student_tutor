/**
 * Constants
 */
import {LogoutAction} from "../auth/types";

export const SETUP_USER = 'user/SETUP_USER';
export const UPDATE_USER_PROFILE = 'user/UPDATE_USER_PROFILE'

/**
 * Types
 */
export type UserProfileStatus = 'pending' | 'approved' | 'rejected'

export type UserProfile = {
  id: string,
  nickname: string,
  portrayedAs: string,
  nicknamePrev: string,
  portrayedAsPrev: string,
  submitted: boolean
  status: UserProfileStatus
}

export type UserData = {
  settled: boolean
  email: string
  isStaff: boolean
  profile: UserProfile
}

interface setupUserAction {
  type: typeof SETUP_USER,
  payload: UserData
}

interface updateUserProfileAction {
  type: typeof UPDATE_USER_PROFILE,
  payload: UserProfile
}


/**
 * Action functions
 */


export interface setupUserFunc {
  (data: UserData): setupUserAction
}

export interface updateUserProfileFunc {
  (data: UserProfile): updateUserProfileAction
}

/**
 * Module action types
 */

export type userActionTypes =
  | setupUserAction
  | LogoutAction
  | updateUserProfileAction

/**
 * State interface
 */

export interface UserState {
  readonly settled: boolean
  readonly email: string
  readonly isStaff: boolean
  profile: UserProfile
}




