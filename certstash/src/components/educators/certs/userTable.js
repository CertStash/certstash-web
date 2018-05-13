import React from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import User from './user'

const styles = {
  table: {
    marginTop: 15
  },
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
      <Table className={classes.table}>
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