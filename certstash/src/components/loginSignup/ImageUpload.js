import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Button, AppBar, Tabs, Tab, Paper } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import NoImage from '../../assets/no_image.png'

const URL = 'http://localhost:8000'

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 0 15px 0',
    minHeight: '200px'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 200,
  },
  paper: {
    width: 450
  },
  logo: {
    maxWidth: '400px',
    maxHeight: '400px'
  },
  block: {
    width: '80%',
    margin: 5
  },
  loadButton: {
    margin: '10px 0 0 0'
  }
}

class ImageUpload extends Component {
  constructor(props){
    super(props)
    this.state = {
      logo: NoImage,
      file: '',
      dropzoneActive: false
    }
  }
  onFocus = () => {
    this.setState({
      dropzoneActive: true
    });
  }

  onBlur = () => {
    this.setState({
      dropzoneActive: false
    });
  }

  onImageDrop = (files) => {
    this.setState({
      logo: files[0].preview, 
      file: files[0], 
      dropzoneActive: false
    })
  }

  uploadFile = () => {
    const { history } = this.props
    const url = `${URL}/${this.props.type}/getSignedUrl?file-name=${this.state.file.name}&file-type=${this.state.file.type}`

    axios.get(url, {headers: {Authorization: localStorage.getItem('token')}})
      .then( res => {
        return axios.put(res.data.signedRequest, 
          this.state.file, 
          {headers: {'Content-Type': `${this.state.file.type}`}}
        )
      })
      .then( res => {
        history.push(this.props.navigateNext)
      })
      .catch( err => {
        console.log(err)
      })
  }

  render(){
    const { classes } = this.props
    const styles = {
      dropZone: {
        backgroundImage: `url(${this.state.logo})`,
        backgroundSize: this.state.file === '' ? 'cover' : 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '400px',
        height: '214px',
        border: this.state.dropzoneActive ? '3px solid #1cc2ff': `1px dashed black`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      },
      dropzoneGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
      text: {
        fontSize: '24px',
        textAlign: 'center'
      },
      reselectButton: {
        margin: '25px'
      }
    }

    return (
      <div className={classes.container}>
        <Paper elevation={4} className={classes.paper}>
          <AppBar position="static">
            <Tabs value={0} >
              <Tab label="Image Upload" />
            </Tabs>
          </AppBar>
          <div className={classes.root}>
            { this.state.file === ''
              ? null
              : <p>Drop new file or click on image to change</p>
            }
            <Dropzone
              style={styles.dropZone}
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop}
              onDragEnter={this.onFocus}
              onDragLeave={this.onBlur}
              onClick={this.onFocus}>
              { this.state.file === ''
                ? <div style={styles.dropzoneGroup}>
                    <p style={styles.text}>Drop an image or click to select a file to upload.</p>
                    <Button variant="raised" color={"primary"}>
                      Select File
                    </Button>
                  </div>
                : null
              }
            </Dropzone>
            <Button variant="raised" disabled={this.state.file === ''} className={classes.loadButton} color={"primary"} onClick={this.uploadFile}>
              Upload File
            </Button>
            <a href="/">Skip This Step for Now</a>
          </div>
        </Paper>
      </div>
    )
  }
}

const component = connect(
  null,
  {}
)(ImageUpload)
export default withStyles(styles)(component)