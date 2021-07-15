import React, {ReactNode} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {RootState} from "../../mudules";
import {connect, ConnectedProps} from "react-redux";

const mapState = (state: RootState) => ({
  tokenValid: state.auth.tokenValid,
})

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
  children: ReactNode
}

function AuthRoute(props: Props) {
  /** Prevent logged in user to see `login/register` route */
  return (
    <Route render={() => props.tokenValid ? <Redirect to="/main" /> : props.children } />
  );
}

export default connector(AuthRoute)