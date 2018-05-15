// Core React Components
import React, { Component } from 'react'

// Material-UI components and functions
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

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