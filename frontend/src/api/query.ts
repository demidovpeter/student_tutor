import {gql} from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register($email: String!, $password1: String!, $password2: String!){
        register(
          email: $email,
          username: $email,
          password1: $password1,
          password2: $password2,
        ) {
          success,
          errors,
          token,
          refreshToken,
        }
      }`;

export const WHO_AM_I = gql`
  query me {
    me {
      username,
      email,
      isStaff,
      profile {
        id
        status
        portrayedAs
        portrayedAsPrev
        nickname 
        nicknamePrev
        submitted
      }
    }
  }
  `
export const VERIFY_TOKEN = gql`
mutation verifyToken($token: String!){
  verifyToken(
    token: $token
  ) {
    success,
    errors,
    payload,
  }
}
`

export const OBTAIN_TOKEN = gql`
mutation tokenAuth($email: String!, $password: String!){
  tokenAuth(
    email: $email
    password: $password
  ) {
    success,
    errors,
    token,
    refreshToken,
    unarchiving,
    user {
      id,
      email,
      isStaff
      profile {
        id,
        status
        portrayedAs
        portrayedAsPrev
        nickname 
        nicknamePrev
        submitted
      }
    }
  }
}
`
export const UPDATE_PROFILE = gql`
mutation updateProfile($id: ID, $nickname: String!, $portrayedAs: String!){
  updateProfile(
    id: $id,
    nickname: $nickname,
    portrayedAs: $portrayedAs
  ) {
    profile {
      portrayedAs,
      nickname,
      portrayedAsPrev,
      nicknamePrev,
      status,
      submitted,
      id
    }
  }
}
`

export const GET_ALL_PROFILES_QUERY = gql`
query allStudents {
  allStudents {
    email
    profile {
      id
      nickname
      portrayedAs
      nicknamePrev
      portrayedAsPrev
      status
      submitted
    }
  }
}
`
export const UPDATE_PROFILE_STATUS = gql`
mutation updateProfileStatus ($id: ID, $status: String!){
  updateProfileStatus(id: $id, status: $status) {
    profile {
      id
      status
    }
  }
}

`