import React from 'react'
import ProfileForm from "../../components/Forms/ProfileForm";
import Dashboard from "./Dashboard";
import {CircularProgress} from "@material-ui/core";
// redux
import {RootState} from "../../mudules";
import {setupUserThink} from "../../mudules/auth";
import {connect, ConnectedProps} from "react-redux";
// apollo
import {WHO_AM_I} from "../../api/query";
import {useLazyQuery} from "@apollo/react-hooks";
// router
import {Redirect, Route, Switch, BrowserRouter as Router} from "react-router-dom";


const mapState = (state: RootState) => ({
  user: state.user
})

const mapDispatch = {
  setupUserThink,
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

function ProtectedView(props: PropsFromRedux) {

  const [meQuery, {loading, data}] = useLazyQuery(WHO_AM_I)

  React.useEffect(() => {
    if (!props.user.settled) {
      meQuery()
      if (data) {
        props.setupUserThink(data.me)
      }
    }
  }, [props, data, meQuery])


  if (loading || !props.user.settled) return <CircularProgress />

  return (
    <Router>
      <Switch>
      <Route path="/dashboard">
        <Dashboard/>
      </Route>
      <Route path="/profile">
        <ProfileForm/>
      </Route>
      {props.user.isStaff? (<Redirect to={'/dashboard'}/>): (<Redirect to={'/profile'}/>)}
      </Switch>
    </Router>

  )
}

export default connector(ProtectedView)