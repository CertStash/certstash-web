import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import { Toolbar, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import User from './user'

const styles = theme => {
  return {
      container: {
        marginTop: 15
      },
      header: {
        padding: '15px 24px 0 24px',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }
    }
}

const CustomTableCell = withStyles(theme => {
  return {
    head: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
    body: {
      fontSize: 14,
    },
  }
})(TableCell);

const UserTable = props => {
    const { classes, users } = props
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="subheading" id="tableTitle">
            Students Found in Our System:
          </Typography>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Name:</CustomTableCell>
              <CustomTableCell>Email:</CustomTableCell>
              <CustomTableCell>Phone:</CustomTableCell>
              <CustomTableCell></CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map( user => <User key={user._id} user={user} /> ) }
          </TableBody>
        </Table>
      </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.cert.users,
    fetchingUsers: state.cert.fetchingUsers
  }
}
const component = connect(
  mapStateToProps,
  { }
)(UserTable)
export default withStyles(styles)(component)