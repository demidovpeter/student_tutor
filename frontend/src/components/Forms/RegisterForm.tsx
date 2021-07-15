import React, {useState} from 'react';
import {Button, CardActions, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import {useStyles} from "../../styles/styles";
import {useMutation} from "@apollo/react-hooks";
import {REGISTER_USER, WHO_AM_I} from "../../api/query";
import {useForm} from "../../utils/hooks/useForm";
import {registerUserThunk} from "../../mudules/auth";
import {connect, ConnectedProps} from "react-redux";
import _ from "lodash";

const mapDispatch = { registerUserThunk }
const connector = connect(null, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
  handleViewChange: () => void
}

type RegisterFormType = {
  email: string,
  password1: string,
  password2: string,
}


function RegisterForm(props: Props) {
  const classes = useStyles()

  let errorsInit = {
    email: '',
    password1: '',
    password2: '',
  }

  const [errors, setErrors] = useState(errorsInit)

  const {onChange, onSubmit, values} = useForm(loginUserCallback, {
    email: '',
    password1: '',
    password2: '',
  });

  const [
    registerUser,
    {
      loading: registerLoading
    }
  ] = useMutation(REGISTER_USER, {
    refetchQueries: [{
      query: WHO_AM_I
    }],
    update(
      __,
      {
        data: {register: userData}, errors:updateError
      }
    ) {

      if (userData.success) {
        props.registerUserThunk(userData)
      } else {
        /** setup errors */
        _.each(errors, (value, key) => {
          if (_.has(userData.errors, key as keyof RegisterFormType)) {
            setErrors(prevState => ({...prevState, [key]: userData.errors[key][0].message}))
          } else {
            setErrors(prevState => ({...prevState, [key]: ''}))
          }
        })
      }
    },
    onError(err) {
      console.error('Registration error ', err)
    },
    variables: values
  })



  function loginUserCallback() {
    registerUser({
      variables: {...values}
    })
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
            helperText={errors.email}
          />
        </Grid>
        <Grid item={true}>
          <TextField
            required
            id="password1"
            name="password1"
            label="Password"
            variant="outlined"
            type="password"
            onChange={onChange}
            value={values.password1}
            error={!!errors.password1}
            helperText={errors.password1}
          />
        </Grid>
        <Grid item={true}>
          <TextField
            required
            id="password2"
            name="password2"
            label="Confirm Password"
            variant="outlined"
            type="password"
            onChange={onChange}
            value={values.password2}
            error={!!errors.password2}
            helperText={errors.password2}
          />
        </Grid>
      </CardContent>
      <Grid container direction="column" alignItems="center">
        <Button disabled={registerLoading} color="primary" type={`submit`} variant={`contained`}>
          Submit
        </Button>
      </Grid>
      <CardActions>
        <Grid container direction="column" alignItems="center">
          <Typography className={classes.link}>
            <span>I have an account</span>
            <Button color="primary"  onClick={props.handleViewChange}>Login</Button>
          </Typography>
        </Grid>
      </CardActions>
    </form>

  )
}

export default connector(RegisterForm)