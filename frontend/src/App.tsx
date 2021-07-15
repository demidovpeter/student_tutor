import React from 'react';
import {useMutation} from "@apollo/react-hooks";
import {VERIFY_TOKEN} from "./api/query";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Auth from "./views/auth/Auth";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "./mudules";
import {checkTokenThunk} from "./mudules/auth";
import ProtectedView from "./views/protected/ProtectedView";
import AuthRoute from "./views/auth/AuthRoute";
import {CircularProgress} from "@material-ui/core";

const mapState = (state: RootState) => ({
  tokenChecked: state.auth.tokenChecked,
  tokenValid: state.auth.tokenValid,
  token: state.auth.token,
})

const mapDispatch = {checkTokenThunk}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>


function App(props: PropsFromRedux) {

  /**
   * Verify, if the user has an access and its grade student or admin
   */

  const token = props.token ? props.token : ''

  const [verify] = useMutation(VERIFY_TOKEN, {
    update(
      _,
      {
        data: {verifyToken}
      }
    ) {
      props.checkTokenThunk(verifyToken)
    },
    variables: {token}
  })

  React.useEffect(() => {
    if (!props.tokenChecked) {
      verify()
    }
  }, [props.tokenChecked, verify])


  return (
    <div>
      {
        !props.tokenChecked ? (
          <CircularProgress />
        ) : (
          <Router>
            <Switch>
              <Route path="/login">
                <AuthRoute>
                  <Auth/>
                </AuthRoute>
              </Route>
              <Route path={'/main'}>
                <ProtectedView/>
              </Route>
              {!props.tokenValid ? (<Redirect to={'/login'}/>) : (<Redirect to={'/main'}/>)}
            </Switch>
          </Router>
        )
      }
    </div>


  );
}

export default connector(App);
