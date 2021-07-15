import React from 'react';
import {Card, Grid, Typography} from "@material-ui/core";
import {useStyles} from "../../styles/styles";

interface Props {
  title: string
  children?: React.ReactNode,
  logoutBtn?: React.ReactNode
}

function BaseCard(props: Props) {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
    >
      <Card>
          <div className={classes.header} style={{position: 'relative'}}>
            <Typography variant={`button`}>{props.title}</Typography>
            {props.logoutBtn}
          </div>
        {props.children}
      </Card>
    </Grid>
  )
}

export default BaseCard