import React from 'react';
import {Button, CardActions, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import {useStyles} from "../../styles/styles";
import BaseCard from "./FormCard";
import {RootState} from "../../mudules";
import {connect, ConnectedProps} from "react-redux";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_PROFILE} from "../../api/query";
import {updateUserProfileThunk} from "../../mudules/user";
import {logoutUserThunk} from "../../mudules/auth";
import LogoutButton from "../Buttons/LogoutButton";

const mapState = (state: RootState) => ({
  nicknamePrev: state.user.profile.nicknamePrev,
  portrayedAsPrev: state.user.profile.portrayedAsPrev,
  idProfile: state.user.profile.id,
  status: state.user.profile.status,
  submitted: state.user.profile.submitted
})

const mapDispatch = {
  updateUserProfileThunk,
  logoutUserThunk
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>


function ProfileForm(props: PropsFromRedux) {
  const classes = useStyles()


  const ProfileHeader = () => {
    let headerText = ''
    if (!props.submitted) {
      headerText = 'Please let us know about yourself!'
    } else {
      switch (props.status.toLocaleLowerCase()) {
        case 'pending':
          headerText = 'The profile is under review'
          break;
        case 'approved':
          headerText = 'Please choose a tutor or update your profile'
          break;
        case 'rejected':
          headerText = 'The data in your profile is not valid. Please resend the form.'
      }
    }
    return (
      <div>
        <Typography gutterBottom variant={`subtitle2`}>{headerText}</Typography>
      </div>
    )
  }

  const [form, setForm] = React.useState({
    nickname: props.nicknamePrev,
    portrayedAs: props.portrayedAsPrev,
  })

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setForm(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const [updateProfileData, {loading}] = useMutation(UPDATE_PROFILE, {
    update(
      _,
      {
        data: {updateProfile}
      }
    ) {
      props.updateUserProfileThunk(updateProfile)

    },
    onError(err) {
      console.error('Update error', err)
      props.logoutUserThunk()
    },
    variables: {id: props.idProfile, ...form}
  })

  async function onSubmitForm(e: any) {
    e.preventDefault()
    updateProfileData()
  }

  return (
    <BaseCard title={`Profile`} logoutBtn={<LogoutButton/>}>
      <form className={classes.root} onSubmit={onSubmitForm}>
        <CardContent>
          <Grid container direction="column" alignItems="center">
            <ProfileHeader/>
            <Grid item={true}>
              <TextField
                id="nickname"
                name="nickname"
                label="Nickname"
                variant="outlined"
                value={form.nickname}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item={true}>
              <TextField
                id="portrayedAs"
                name="portrayedAs"
                label="Portrayed as"
                variant="outlined"
                value={form.portrayedAs}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent={`space-around`} alignItems={`center`} className={classes.actionButtons}>
            <Button
              color="primary"
              type={`submit`}
              variant={`contained`}
              disabled={loading}
            >
              Edit
            </Button>
            <Button
              color="primary"
              variant={`contained`}
              disabled={props.status.toLocaleLowerCase() !== 'approved' || !props.submitted}
              onClick={() => alert('1000\'s of tutors available for you now!')}
            >
              Find tutor
            </Button>
          </Grid>
        </CardActions>
      </form>
    </BaseCard>
  )
}

export default connector(ProfileForm)