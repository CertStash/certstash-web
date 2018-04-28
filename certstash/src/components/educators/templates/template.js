import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import { Paper } from 'material-ui'
import { connect } from 'react-redux'
import { loadTemplate } from '../../../actions/certActions'
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    cursor: 'pointer'
  },
  paper: {
    width: '90%',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '10px'
  }
}

const Template = (props) => {
  const { classes, template, navCallback } = props
  const clickHandler = () => {
    props.loadTemplate(template)
    navCallback()
  }
  return (
    <div className={ classes.container } onClick={ clickHandler }>
      <Paper elevation={4} className={ classes.paper }>
        <Typography variant="headline" component="h2" align="left">
          { template.name }
        </Typography>
        <Typography component="p" align="left">
          Description: { template.description }
        </Typography>
        <Typography component="p" align="left">
          Valid for: { template.validDuration.label }
        </Typography>
      </Paper>
    </div>
  )
}
const component = connect(null, { loadTemplate })(Template)
export default withStyles(styles)(component)