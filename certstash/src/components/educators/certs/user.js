import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import { TableCell, TableRow } from 'material-ui/Table';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
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
        <Icon onClick={ () => { removeUser(user) }} className={classes.removeIcon}>remove_circle</Icon>
      </TableCell>
    </TableRow>
  )
}
const component = connect(null, { removeUser })(User)
export default withStyles(styles)(component)