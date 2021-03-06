import React from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import routes from '../../helpers/routes'

const styles = {
  card: {
    maxWidth: 450,
    position: 'absolute',
    top: 350,
  }
};

function StudentLearnMore(props){
  const { classes, history } = props;
  return  (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          Learn More
        </Typography>
        <Typography component="p">
          Something here about getting your cards automatically added to your guide wallet. etc etc etc.
          More stuff about not losing your cards, and being reminded when you need to recertify.
          Something about being able to send all of your certs to your employer or volunteer organization with one url.
          Something about cutting down on wasted paper certs. 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => history.push(routes.studentSignup)}>
          Sign Up
        </Button>
        <Button size="small" color="primary" onClick={() => history.push(routes.studentLogin)}>
          Log In
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(StudentLearnMore);