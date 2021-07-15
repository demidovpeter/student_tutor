import React from 'react';
import {
  MenuItem, Table, TableBody, TableContainer, TableHead, TableRow,
  CircularProgress, Paper, Select, TableCell
} from "@material-ui/core";
import {useStyles} from "../../styles/styles";
// apollo
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {GET_ALL_PROFILES_QUERY, UPDATE_PROFILE_STATUS} from "../../api/query";
// redux
import {connect, ConnectedProps} from "react-redux";
import {getAllProfilesThunk, updateProfileStatusThunk} from "../../mudules/dashboard";
import {RootState} from "../../mudules";
import BaseCard from "../../components/Forms/FormCard";
import LogoutButton from "../../components/Buttons/LogoutButton";

const mapState = (state: RootState) => ({
  profiles: state.dash.profiles
})
const mapDispatch = {
  getAllProfilesThunk,
  updateProfileStatusThunk
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
}

function Dashboard(props: Props) {
  const classes = useStyles()

  const [profilesQuery, {loading, data}] = useLazyQuery(GET_ALL_PROFILES_QUERY)

  React.useEffect(() => {
    profilesQuery()
    if (data) {
      props.getAllProfilesThunk(data.allStudents)
    }
  },[data, profilesQuery])

  const [updateStatus] = useMutation(UPDATE_PROFILE_STATUS, {
    update(
      _,
      {
        data: {updateProfileStatus}
      }
    ) {
      props.updateProfileStatusThunk(updateProfileStatus.profile)
    }
  })

  function handleChange(e: any) {
    updateStatus({
      variables: {id: e.target.name, status: e.target.value}
    })
  }
  if (loading) return <CircularProgress/>
  return (
    <BaseCard title={`Dashboard`} logoutBtn={<LogoutButton/>}>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Submitted</TableCell>
            <TableCell align="right">Nickname Prev</TableCell>
            <TableCell align="right">Nickname</TableCell>
            <TableCell align="right">Portrayed As Prev</TableCell>
            <TableCell align="right">Portrayed As</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.profiles.map((row:any) => (
            <TableRow key={row.email}>
              <TableCell component="th" scope="row">{row.email}</TableCell>
              <TableCell align="right">
              <Select
                  labelId="status-selector"
                  id={row.profileId}
                  name={row.profileId}
                  value={row.status}
                  onChange={handleChange}
                >
                  <MenuItem value={'APPROVED'}>Approved</MenuItem>
                  <MenuItem value={'PENDING'}>Pending</MenuItem>
                  <MenuItem value={'REJECTED'}>Rejected</MenuItem>
                </Select>

              </TableCell>
              <TableCell align="right">{row.submitted? 'Yes': 'No'}</TableCell>
              <TableCell align="right">{row.nicknamePrev}</TableCell>
              <TableCell align="right">{row.nickname}</TableCell>
              <TableCell align="right">{row.portrayedAsPrev}</TableCell>
              <TableCell align="right">{row.portrayedAs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </BaseCard>
  )
}

export default connector(Dashboard);