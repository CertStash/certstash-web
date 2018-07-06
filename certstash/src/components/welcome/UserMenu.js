import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { logout } from '../../actions/org'

const UserMenu = props => {
  const styles = {
    paper: {
      width: 150,
      position: 'absolute',
      top: 40,
      right: 40,
      transform: props.open ? 'scale(1,1)' : 'scale(0,0)',
      transformOrigin: '100% 0%',
      transition: 'transform 300ms'
    },
    item: {
      textAlign: 'center',
      padding: '20px 0'
    }
  }

  return (
    <Paper elevation={4} style={styles.paper}>
      <div style={styles.item}>
        <Typography variant="subheading" component="h3" >View Profile</Typography>
      </div>
      <div style={styles.item} onClick={props.logout}>
        <Typography variant="subheading" component="h3">Sign Out</Typography>
      </div>
    </Paper>
  )
}

export default connect(() => ({}), { logout })(UserMenu)