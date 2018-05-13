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

const SuccessModal = () => {
  const transition = () => {
    return <Slide direction="down" />;
  }
  return (
    <div></div>
  )
}