import React from 'react'
// import Rescue from '../../assets/rescue.jpg'
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    marginTop: '64',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    position: 'relative'
  },
  card: {
    maxWidth: 450,
    position: 'absolute',
    top: 350,
  },
  media: {
    height: 260,
  }
};

function Welcome(props){
  const { classes, history } = props;
  return  (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Welcome to CertStash
          </Typography>
          <Typography component="p">
            CertStash is a digital replacement for your old, worn out, easy to lose, professional certification cards and certificates. 
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => history.push('/student/learnmore')}>
            Learn More
          </Button>
          <Button size="small" color="primary" onClick={() => history.push('/student/signup')}>
            Sign Up
          </Button>
          <Button size="small" color="primary" onClick={() => history.push('/student/login')}>
            Log In
          </Button>
          <Button size="small" color="primary" onClick={() => history.push('/educator/learnmore')}>
            Educators
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(Welcome);