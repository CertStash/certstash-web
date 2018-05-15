import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import routeStrings from '../../helpers/routeStrings'


const styles = {
  root: {
    marginTop: '64',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  card: {
    maxWidth: 450,
    position: 'absolute',
    top: 200,
  },
  media: {
    height: 260,
  },
  title: {
    margin: '0 auto'
  }

};

function LoginChoice(props){
  const { classes, history } = props;
  return  (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2" className={classes.title}>
            Are you a Student or Educator?
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => history.push(routeStrings.studentLogin)}>
            Student
          </Button>
          <Button size="small" color="primary" onClick={() => history.push(routeStrings.educatorLogin)}>
            Educator
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(LoginChoice);