import {
  DashboardActionTypes,
  DashboardProfileView,
  DashboardState,
  GET_ALL_PROFILES,
  GetAllProfilesFunc
} from "./types";
import {AppThunk} from "../index";
import _ from "lodash";
import {LOGOUT} from "../auth/types";


/**
 * Action Creators
 */

export const getAllProfiles: GetAllProfilesFunc = function (data) {
  return {
    type: GET_ALL_PROFILES,
    payload: data
  }
}


export function getAllProfilesThunk(profilesData: any): AppThunk {
  return async dispatch => {

    let data: DashboardProfileView[] = []
    _.each(profilesData, (item) => {
      if (item.profile) {
        data.push({
          email: item.email,
          profileId: item.profile.id,
          nickname: item.profile.nickname,
          portrayedAs: item.profile.portrayedAs,
          nicknamePrev: item.profile.nicknamePrev,
          portrayedAsPrev: item.profile.portrayedAsPrev,
          status: item.profile.status,
          submitted: item.profile.submitted,
        })
      }
    })
    dispatch(getAllProfiles(data))
  }
}

export function updateProfileStatusThunk(updatedData: any): AppThunk {
  return async (
    dispatch,
    getState
  ) => {
    let profiles = getState().dash.profiles
    const targetProfile = _.find(profiles, {profileId: updatedData.id}) as DashboardProfileView
    const index = profiles.indexOf(targetProfile)
    profiles[index].status = updatedData.status
    dispatch(getAllProfiles(profiles))
  }
}

/**
 * Reducer
 */

const initialState: DashboardState = {
  profiles: []
}


export function dashboardReducer(
  state = initialState,
  action: DashboardActionTypes
): DashboardState {
  switch (action.type) {
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: action.payload
      }
    case LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}






