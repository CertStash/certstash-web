import React, { Component } from 'react'
import UserMenu from './UserMenu'
import { Typography } from '@material-ui/core'
class UserBanner extends Component {
  state = {
    menuOpen: false
  }
  toggleMenu = () => {
    this.setState(prev => ({menuOpen: !prev.menuOpen}))
  }
  render() {
    const style = {
      container: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      },
      name: {
        marginRight: 10
      },
      image: {
        borderRadius: '50%',
        width: 30,
        height: 30,
        backgroundImage: `url(${this.props.imageUrl})`,
        backgroundSize: 'cover'
      }
    }
    return (
      <div style={style.container} onClick={this.props.clickHandler} onMouseEnter={this.toggleMenu} onMouseLeave={this.toggleMenu}>
        <Typography variant="subheading" component="h3" color="inherit" style={style.name}>{this.props.name}</Typography>
        <div style={style.image} />
        <UserMenu open={this.state.menuOpen}/>
      </div>
    )
  }
}

export default UserBanner