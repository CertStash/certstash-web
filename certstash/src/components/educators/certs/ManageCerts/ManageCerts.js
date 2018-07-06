import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Paper, 
  Button, 
  Typography, 
  TextField, 
  Icon, 
  Tooltip, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select,
  Table,
  TableBody,
  TableHead, 
  TableRow,
  TableCell
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { format, getYear } from 'date-fns'
import { getCerts, revokeCert, reinstateCert } from '../../../../actions/certActions'
import ManageFilter from './ManageFilter'

// In the future there will be a selection tool based on user email, date issued, or phone
// There will be a paginated table showing the certifications issued. Start of pagination is 25.
// Thery will be allowed to revoke a certification.
// In the future they will be able to apply a different course template to the cert (in the case a mistake was made)
const styles = {
  root: {
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
  removeIcon: {
    cursor: 'pointer',
    color: '#d30000'
  },
  reinstateIcon: {
    cursor: 'pointer',
    color: '#009313'
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  filterButton: {
    width: '15%'
  }
}
class ManageCerts extends Component {
  state = {
    filterOpen: false,
  }

  componentDidMount(){
    this.props.getCerts()
  }

  toggleFilter = () => {
    this.setState( prev => ({filterOpen: !prev.filterOpen}))
  }

  revokeCert = (id) => {
    return () => {
      this.props.revokeCert(id)
    }
  }

  reinstateCert = (id) => {
    return () => {
      this.props.reinstateCert(id)
    }
  }

  render(){
    const { classes, courses, certs, org } = this.props
    console.log(org)
    return (
      <div className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          { org.orgName
            ? <div className={classes.buttons}>
                <Button variant="raised" className={classes.filterButton} color={"primary"} onClick={this.toggleFilter} >
                    { this.state.filterOpen ? `▲ Filter` : `▼ Filter` }
                </Button>
              </div>
            : null 
          }
          { org.orgName && this.state.filterOpen
            ? <ManageFilter />
            : null
          }
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Issued</TableCell>
                <TableCell>Expires</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certs.map( cert => {
                const expires = getYear(cert.expires) < 2100 ? format(cert.expires, 'MM/DD/YYYY') : 'No Expiration'
                return (
                  <TableRow key={cert._id}>
                    <TableCell>{`${cert.userId.firstName} ${cert.userId.lastName}`}</TableCell>
                    <TableCell>{cert.userId.email}</TableCell>
                    <TableCell>{cert.courseId.name}</TableCell>
                    <TableCell>{format(cert.createdAt, 'MM/DD/YYYY')}</TableCell>
                    <TableCell>{cert.isRevoked ? "Currently Revoked" : expires}</TableCell>
                    <TableCell>
                      <Tooltip 
                        title={ cert.isRevoked ? "Reinstate Certification" : "Revoke Certification"} 
                      >
                        <Icon 
                          onClick={ cert.isRevoked ? this.reinstateCert(cert._id) : this.revokeCert(cert._id) } 
                          className={ cert.isRevoked ? classes.reinstateIcon : classes.removeIcon}
                        >
                          {cert.isRevoked
                            ? 'add_circle'
                            : 'remove_circle'
                          }
                        </Icon>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    certs: state.cert.certs,
    org: state.org
  }
}
export default withStyles(styles)(connect(mapStateToProps, { getCerts, revokeCert, reinstateCert })(ManageCerts))