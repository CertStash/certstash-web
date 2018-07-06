// Core React Components
import React, { Component } from 'react'

// @material-ui/core components and functions
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

const transition = props => {
  return <Slide direction="down" {...props}/>;
}

const SuccessModal = (props) => {

  return (
    <Dialog 
      open={props.open} 
      transition={transition}
      onClose={props.closeSuccessModal}
      style={{padding: 25}}
    >
      <DialogTitle>Certifications Successfully Issued</DialogTitle>
      <DialogContent>
        <DialogContentText>
          What would you like to do next?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="raised" color={"primary"} onClick={props.navigateHome}>
          Return to home
        </Button>
        <Button variant="raised" color={"primary"} onClick={props.navigateIssue}>
          Issue more certs
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SuccessModal