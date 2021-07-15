import React from "react";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import {IconButton, Tooltip} from "@material-ui/core";
import {useStyles} from "../../styles/styles";
import {connect, ConnectedProps} from "react-redux";
import {logoutUserThunk} from "../../mudules/auth";

const mapDispatch = {
  logoutUserThunk
}
const connector = connect(null, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

function LogoutButton(props: PropsFromRedux) {
  const classes = useStyles()

  return (
    <Tooltip title={'Logout'} placement={`right-start`}>
      <IconButton
        aria-label="logout"
        className={classes.logoutButton}
        onClick={props.logoutUserThunk}
      >
        <PowerSettingsNewIcon/>
      </IconButton>
    </Tooltip>

  )
}

export default connector(LogoutButton)