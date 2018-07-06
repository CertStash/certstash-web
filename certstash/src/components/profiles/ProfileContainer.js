import React, { Component } from 'react'
import { getUserProfile } from '../../actions/profileActions'
import { connect } from 'react-redux'
class ProfileContainer extends Component {
  styles = {

  }
  render(){
    return (
      <div style={this.styles.container}>
        <div style={this.styles.banner}></div>
        <div> style={this.styles.photo}</div>
      </div>
    )
  }
}
const mapStateToProps = state => ({profile: state.profile})
export default connect(mapStateToProps, { getUserProfile })(ProfileContainer)