import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import routeStrings from '../../helpers/routeStrings'

const styles = {
  card: {
    maxWidth: 450,
    position: 'absolute',
    top: 350,
  }
}

function EducatorLearnMore(props) {
  const {classes, history} = props
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          Educators
        </Typography>
        <Typography component="p">
          Join the ranks of such internationally recognized educators such as; The American Red Cross, National Outdoor Leadership School (NOLS), Rescue3, The American Institute for Avalanche Research and Education (AIARE), and hundreds more!  
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => history.push(routeStrings.educatorSignup)}>
          Sign Up
        </Button>
        <Button size="small" color="primary" onClick={() => history.push(routeStrings.educatorLogin)}>
          Log In
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(EducatorLearnMore);