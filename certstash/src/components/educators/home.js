import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Paper } from 'material-ui'
import { getTemplates } from '../../actions/certActions'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 200,
  },
  paper: {
    width: 450,
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loadButton: {
    margin: '10px'
  }
}

class EducatorHome extends Component {
  createTemplateClick = () => {
    const { history, match } = this.props
    history.push(`${match.url}/createTemplate`)
  }

  getTemplateClick = () => {
    this.props.getTemplates( () => { this.props.history.push(`/educator/manageTemplates`) })
  }
  
  issueCertClick = () => {
    this.props.getTemplates(() => { this.props.history.push(`/educator/selectTemplate`) })
  }

  render(){
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Paper elevation={4} className={classes.paper}>
          <Typography variant="headline" component="h2" align="center">
            Welcome to CertStash!
          </Typography>
          {this.props.org.templates.length === 0 
            ? <Typography component="p" align="center">
                It looks like you haven't created any templates yet, let's get started!
              </Typography>
            : null
          }
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.createTemplateClick}>
            Create New Template
          </Button>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.getTemplateClick}>
            Manage Templates
          </Button>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.issueCertClick}>
            Issue New Certification(s)
          </Button>
          <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.createTemplateClick}>
            Manage Certification(s)
          </Button>
        </Paper>
      </div>
    )
  }
}
const mapStateToProps = state => ({org: state.org, template: state.cert.template})
const component = connect(
  mapStateToProps,
  { getTemplates }
)(EducatorHome)
export default withStyles(styles)(component)