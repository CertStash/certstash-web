// Core React Components
import React, { Component } from 'react'

import { connect } from 'react-redux'

// @material-ui/core components and functions
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide, 
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

import { getUsers } from '../../../actions/certActions'
import { parseCSV, getEmailsFromCSV } from '../../../helpers/csvHelper'

// Styles object
const styles = {
  chooseButton: {
    marginTop: 10
  },
  fileTitle: {
    display: 'inline',
    margin: 30
  }
}
class CSVModal extends Component {
  state = {
    csvFile: null,
    error: '',
    loading: null
  }
  
  // This ref will be put on the file input element
  inputRef = React.createRef()

  static getDerivedStateFromProps(nextProps, prevState){
    if ((nextProps.fetching !== prevState.loading) && prevState.csvFile !== null){
      return {loading: nextProps.fetching}
    } else {
      return null
    }
  }

  componentDidUpdate( __, prevState){
    if(prevState.loading === true && this.state.loading === false){
      this.clearFileAndClose()
    }
  }

  transition = props => {
    return <Slide direction="down" {...props} />;
  }

  fileSelect = e => {
    this.setState({csvFile: e.target.files[0], error: ''})
  }

  uploadCSV = () => {
    const csv = this.state.csvFile
    parseCSV(csv)
      .then( parsedCsv => getEmailsFromCSV(parsedCsv) )
      .then( emails => this.props.getUsers(emails) )
      .catch( err => this.clearFileAndError(err) )
  }

  clearFileAndError = err => {
    this.setState({csvFile: null, error: err})
  }

  clearFileAndClose = () => {
    this.setState({csvFile: null})
    this.props.closeCb()
  }

  // This function is called when the 'Choose File' button is clicked.
  // It will fire the click event on the file input.
  inputFileClick = () => {
    this.inputRef.current.click()
  }

  render(){
    const { classes } = this.props
    return (
      <Dialog 
        open={this.props.open} 
        transition={this.transition}
        onClose={this.clearFileAndClose}
        className={classes.dialog}
      >
        <DialogTitle>Upload a CSV</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a CSV file to upload. Note there must be an 'email' column in order to find the students.
          </DialogContentText>
          <input type="file" onChange={this.fileSelect} ref={this.inputRef} style={{display: 'none'}}/>
          <Button onClick={this.inputFileClick} variant="raised" color={"primary"} className={classes.chooseButton}>
            Choose File  
          </Button>
          { this.state.csvFile
            ? <Typography variant="title" component="span" className={classes.fileTitle}>
                {this.state.csvFile.name}
              </Typography>
            : null
          }
        </DialogContent>
        <DialogActions>
          <Button variant="raised" color={"primary"} onClick={this.clearFileAndClose} disabled={this.state.loading}>
            Cancel
          </Button>
          <Button variant="raised" color={"primary"} onClick={this.uploadCSV} disabled={this.state.csvFile === null}>
            {this.props.fetching
              ? <CircularProgress className={classes.progress} size={40} color="inherit"/>
              : 'Upload CSV'
            }
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
const mapStateToProps = state => ({fetching: state.cert.fetchingUsers})
const component = connect(mapStateToProps, { getUsers })(CSVModal)
export default withStyles(styles)(component)