import React from 'react'

import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import { TableCell, TableRow, Typography, Icon, Tooltip } from '@material-ui/core';

import { removeUser } from '../../../actions/certActions'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    cursor: 'pointer'
  },
  paper: {
    width: '90%',
    padding: 25,
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px'
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  removeIcon: {
    cursor: 'pointer'
  }
}

const User = (props) => {
  const { classes, user, removeUser } = props
  return (
    <TableRow>
      <TableCell>
        <Typography component="p" align="left">
          { user.firstName } { user.lastName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography component="p" align="left">
          { user.email }
        </Typography>
      </TableCell>
      <TableCell>
        <Typography component="p" align="left">
          { user.phone }
        </Typography>
      </TableCell>
      <TableCell>
        <Tooltip title="Remove User" >
          <Icon onClick={ () => { removeUser(user) }} className={classes.removeIcon}>remove_circle</Icon>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
const component = connect(null, { removeUser })(User)
export default withStyles(styles)(component)