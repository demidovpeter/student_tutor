/**
 * Constants
 */
export const SET_TOKEN = 'auth/SET_TOKEN';
export const TOKEN_VALID = 'auth/TOKEN_VALID';
export const TOKEN_INVALID = 'auth/TOKEN_INVALID';
export const LOGOUT = 'auth/LOGOUT';

export const TOKEN_KEY = "access_token"

/**
 * Types
 */
export type Token = string | null

/**
 * Action Interface
 */

interface SetTokenAction {
    type: typeof SET_TOKEN
    payload: Token
}

interface TokenValidAction {
    type: typeof TOKEN_VALID
}

interface TokenInvalidAction {
    type: typeof TOKEN_INVALID
}
export interface LogoutAction {
    type: typeof LOGOUT
}
/**
 * Action functions
 */
export interface logoutFunc {
    (): LogoutAction
}

/**
 * Module action types
 */
export type AuthActionTypes =
    | SetTokenAction
    | TokenValidAction
    | TokenInvalidAction
    | LogoutAction

/**
 * State interface
 */

export interface AuthState {
    tokenChecked: boolean,
    tokenValid: boolean,
    token: Token
}

