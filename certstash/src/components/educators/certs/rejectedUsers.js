import React from 'react'

import { connect } from 'react-redux'

import { Paper, Chip } from '@material-ui/core'
import { withStyles } from '@material-ui/core'

import { removeRejected } from '../../../actions/certActions'

const styles = {
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 15
  },
  chip: {
    margin: 10
  }
}

const RejectedUsers = (props) => {
  const deleteRejected = (email) => {
    return () => {
      props.removeRejected(email)
    }
  }
  return (
    <Paper className={props.classes.paper}>
      {props.rejectedUsers.map( (email, i) => {
        return <Chip key={i} label={email} onDelete={deleteRejected(email)} className={props.classes.chip}/>
      })}
    </Paper>
  )
}

const mapStateToProps = state => ({rejectedUsers: state.cert.rejectedUsers})
const component = connect(mapStateToProps, { removeRejected })(RejectedUsers)
export default withStyles(styles)(component)