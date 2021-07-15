import React, {useState} from 'react';
import {Button, CardActions, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import {useStyles} from "../../styles/styles";
import {OBTAIN_TOKEN} from "../../api/query";
import {useMutation} from "@apollo/react-hooks";
import {connect, ConnectedProps} from "react-redux";
import {useForm} from "../../utils/hooks/useForm";
import {loginUserThunk} from "../../mudules/auth";


const mapDispatch = { loginUserThunk }
const connector = connect(null, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
  handleViewChange: () => void
}

function LoginForm(props: Props) {

  const classes = useStyles()

  const [errors, setErrors] = useState<any>({});

  const {onChange, onSubmit, values} = useForm(loginUserCallback, {
    email: '',
    password: ''
  });
  const [loginUser] = useMutation(OBTAIN_TOKEN, {
    update(
      _,
      {
        data: {tokenAuth: userData},
      }
    ) {
      props.loginUserThunk(userData)
      if (userData.errors) {
        /** Single error is possible - invalid credentials */
        setErrors({email: true, password: true})
      }
    },
    onError(err) {
      console.error('Login error ', err)
    },
    variables: values
  })

  function loginUserCallback() {
    loginUser({
      variables: {...values}
    });
  }

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <CardContent>
        <Grid item={true}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={onChange}
            value={values.email}
            error={!!errors.email}
          />
        </Grid>
        <Grid item={true}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={onChange}
            value={values.password}
            error={!!errors.password}
          />
        </Grid>
        {Object.keys(errors).length > 0 &&
          <Grid container direction="column" alignItems="center">
              <Typography variant={`body2`} color={`error`}>Please enter valid credentials</Typography>
          </Grid>
        }
      </CardContent>
      <Grid container direction="column" alignItems="center">
        <Button color="primary" type={`submit`} variant={`contained`}>Submit</Button>
      </Grid>
      <CardActions>
        <Grid container direction="column" alignItems="center">
          <Typography className={classes.link}>
            <span>Are you new here?</span>
            <Button color="primary" onClick={props.handleViewChange}>Sign In</Button>
          </Typography>
        </Grid>
      </CardActions>
    </form>

  )
}

export default connector(LoginForm)