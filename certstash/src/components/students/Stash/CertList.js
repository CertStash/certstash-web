import React, { Component } from 'react'
import { getUserProfile } from '../../../actions/profileActions'
import { connect } from 'react-redux'
import { Typography, Paper, Icon, AppBar } from '@material-ui/core'

import CertCard from './CertCard'

class CertList extends Component {
  styles = {
    container: {
      width: '100%',
      marginTop: 84,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    info: {
      width: '80%',
      display: 'flex',
      flexWrap: 'wrap',
      margin: '50px 0 0 0'
    },
    topBar: {
      width: '100%',
      padding: 60,
      display: 'flex'
    },
    infoContainer: {
      marginLeft: 60,
      display: 'flex',
      flexDirection: 'column',
      borderBottom: '2px solid lightgrey'
    },
    location: {
      display: 'flex', 
      alignItems: 'center',
      marginBottom: 15
    },
    stats: {
      width: '50%',
      display: 'flex',
      flexWrap: 'wrap',
      margin: '50px 0 0 0',
      padding: '35px 45px 15px 45px'
    },
    statGroup: {
      marginRight: 30,
      marginBottom: 20,
      display: 'flex'
    },
    appBar: {
      padding: 15
    },
  }
  componentDidMount(){
    const { match, getUserProfile } = this.props;
    getUserProfile(match.params.name)
  }
  render(){
    const renderStyle = {
      photo: {
        minWidth: 240,
        height: 240,
        backgroundColor: 'grey',
        backgroundImage: `url(${this.props.profile.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }
    console.log(this.props.profile)
    return (
      <div style={this.styles.container}>
          <Paper style={this.styles.info}>
            <div style={this.styles.topBar}>
              <div style={renderStyle.photo}></div>
              <div style={this.styles.infoContainer}>
                <Typography component="h1" variant="display3" color="primary" >{this.props.profile.firstName} {this.props.profile.lastName}</Typography>
                <Typography component="h2" variant="headline" color="textSecondary" >{this.props.profile.occupation}</Typography>
                <div style={this.styles.location}>
                  <Icon style={{fontSize: 20}}>room</Icon>
                  <Typography component="h2" variant="subheading" style={{display: 'inline'}}>{this.props.profile.location}</Typography>
                </div>
                <div style={this.styles.statGroup}>
                  <Typography component="h2" variant="subheading" >{this.props.profile.description}</Typography>
                </div>
              </div>
            </div>
            <AppBar position="static">
              <Typography style={this.styles.appBar} variant="title" color="inherit">
                Certifications ({this.props.profile.certs.length}):
              </Typography>
            </AppBar>
            { this.props.profile.certs.map( cert => {
              return <CertCard cert={cert} name={`${this.props.profile.firstName} ${this.props.profile.lastName}`} key={cert._id}/>
            })}
          </Paper>
        </div>
    )
  }
}

const mapStateToProps = state => ({profile: state.profile})
export default connect(mapStateToProps, { getUserProfile })(CertList)