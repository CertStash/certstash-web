import React from 'react'
import { Typography } from '@material-ui/core'
import { format } from 'date-fns'
const CertCard = (props) => {
  const { cert } = props
  const { organizationId, courseId  } = cert

  const styles = {
    card: {
      width: '100%',
      borderBottom: '1px solid lightgrey',
      padding: '30px 60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      height: 50,
      marginRight: 10
    },
    org: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    },
    body: {
      marginTop: 15,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    dates: {
      marginTop: 20,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around'
    },
    importantInfo: {
      margin: 10
    }
  }
  
  if(cert.isRemoved || cert.isRevoked){
    return
  }

  return (
    <div style={styles.card}>
      <div style={styles.org}>
        <img src={props.cert.organizationId.imageUrl} style={styles.logo} />
        <Typography variant="title" color="inherit" style={{marginLeft: 10}}>
          {organizationId.orgName}
        </Typography>
      </div>
      <div style={styles.body}>
        <Typography component="span" variant="subheading">
          This card is to certify that
        </Typography>
        <Typography component="span" variant="headline" style={styles.importantInfo}>
          {props.name}
        </Typography>
        <Typography component="span" variant="subheading">
          has successfully completed all course requirements, including written and practical examinations, and is hereby certified in:
        </Typography>
        <Typography component="span" variant="headline" style={styles.importantInfo}>
          {courseId.name}
        </Typography>
      </div>
      <Typography component="span" variant="subheading">
          Instructor: {cert.instructor}
      </Typography>
      <div style={styles.dates}>
        <Typography component="span" variant="subheading">
          Issued: {format(cert.createdAt, 'MM/DD/YYYY')}
        </Typography>
        <Typography component="span" variant="subheading">
          Expires: {format(cert.expires, 'MM/DD/YYYY')}
        </Typography>
      </div>
      <div style={styles.description}>
      </div>
    </div>
  )
}

export default CertCard