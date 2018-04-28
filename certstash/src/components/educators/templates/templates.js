import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Paper } from 'material-ui'
import Template from './template'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    top: 200,
  },
  paper: {
    width: '75%',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loadButton: {
    margin: '10px auto',
    display: 'block'
  }
}

class Templates extends Component {
  createTemplateClick = () => {
    const { history, match } = this.props
    history.push(`${match.url}/createTemplate`)
  }
  templateClickHandler = () => {
    const { history, locString } = this.props
    history.push(locString)
  }
  render(){
    const {classes} = this.props
    return (
      <div className={classes.container}>
        <Paper elevation={4} className={classes.paper}>
          <Typography variant="headline" component="h2" align="center">
            Select a Template:
          </Typography>
          {this.props.templates.length === 0 
            ? <div>
                <Typography component="p" align="center">
                  It looks like you haven't created any templates yet, let's get started!
                </Typography>
                <Button variant="raised" className={classes.loadButton} color={"primary"} onClick={this.createTemplateClick}>
                  Create Template
                </Button>
              </div>
            : null
          }
          {this.props.templates.map( (item, index) => {
            return <Template key={index} template={ item } navCallback={ this.templateClickHandler } />
          })}
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({templates: state.org.templates})
const component = connect(
  mapStateToProps,
  { }
)(Templates)
export default withStyles(styles)(component)