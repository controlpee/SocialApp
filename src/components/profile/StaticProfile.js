import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// MUI stuff
import  Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
// icons
import CalendarToday from '@material-ui/icons/CalendarToday';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';


const styles = (theme) => ({
...theme.themeObject
});

const StaticProfile = (props) => {
const { 
    classes, 
    profile: { 
        handle, 
        createdAt, 
        imageUrl, 
        bio, 
        website, 
        location
    } } = props;

return (
    <Paper className={classes.paper}>
    <div className={classes.profile}>
     <div className="image-wrapper">
    <img src ={imageUrl} alt="Profile" className="profile-image" />
    </div>
    <hr />
    <div className="proifle-details">
    <MuiLink 
    component={Link} 
    to={`/user/${handle}`} 
    variant="h5" color="primary">
    @{handle} 
    </MuiLink>
    <hr/>
    {bio && <Typography variant='body2'>{bio}</Typography>}
    <hr />  
    {location && (
<Fragment>
<LocationOn color="primary"/> 
<span>{location}</span>
</Fragment>
    )}
    <hr />
{website && (
    <Fragment>
    <LinkIcon color="primary" />
    <a href={website} target="_blank" rel="noopener noreferrer">
        {' '}{website}</a>
    <hr />
    </Fragment>
)}  
<CalendarToday color="primary" /> {' '}
<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
</div>     
    </div>
    </Paper>
)
}
StaticProfile.propTypes = {
 profile: PropTypes.func.isRequired,
 classes: PropTypes.object.isRequired   
}
export default withStyles(styles)(StaticProfile)
