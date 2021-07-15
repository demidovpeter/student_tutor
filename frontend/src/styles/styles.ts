import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },

  },
  link: {
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  actionButtons: {
    marginBottom: theme.spacing(3)
  },
  table: {
    width: 800
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    height: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    color: theme.palette.common.white,
    fontSize: 'small'
  }
}));