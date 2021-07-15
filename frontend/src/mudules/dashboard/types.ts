import {UserProfileStatus} from "../user/types";
import {LogoutAction} from "../auth/types";

/**
 * Constants
 */
export const GET_ALL_PROFILES = 'dashboard/GET_ALL_PROFILES';

/**
 * Types
 */

export type DashboardProfileView = {
  readonly email: string,
  readonly profileId: string,
  readonly nickname: string,
  readonly portrayedAs: string,
  readonly nicknamePrev: string,
  readonly portrayedAsPrev: string,
  status: UserProfileStatus,
  readonly submitted: boolean
}

interface GetAllProfiles {
  type: typeof GET_ALL_PROFILES,
  payload: Array<DashboardProfileView>
}

/**
 * Action functions
 */

export interface GetAllProfilesFunc {
  (data: Array<DashboardProfileView>): GetAllProfiles
}

/**
 * Module action types
 */

export type DashboardActionTypes = GetAllProfiles | LogoutAction

/**
 * State interface
 */

export interface DashboardState {
  profiles: Array<DashboardProfileView>
}
