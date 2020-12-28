import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';


// Mui sfuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


// Redux stuffs
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';


// Mui icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


const styles = (theme) => ({ 
...theme.themeObject});
// 
// followersWrapper: {
//     float: 'left'
// },
// followingWrapper: {
// float: 'right'
// }


class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
const formData = new FormData();
formData.append('image', image, image.name);
this.props.uploadImage(formData);
};

    handleEditPicture = () => {
        const fileInput = document.querySelector('#imageInput');
        fileInput.click();
    }
handleLogout = () =>  {
    this.props.logoutUser();
}

    render() {
const { 
    classes, 
    user: { 
    credentials: { 
    handle, 
    createdAt, 
    imageUrl, 
    bio, 
    website, 
    location
    // followers,
    // following 
},
authenticated, 
loading
}
} = this.props

    let profileMarkup = !loading ? (
        authenticated ? (
        <Paper className={ classes.paper }>
            <div className={classes.profile}>
            <div className="image-wrapper">
            <img src={ imageUrl } className ="profile-image" alt="Profile" />
            <input type="file"
            id="imageInput"
            hidden="hidden"
            onChange={this.handleImageChange} />

            <MyButton tip="Edit Profile Picture" onClick={this.handleEditPicture} btnClassName="button">
            <EditIcon color="primary" />
            </MyButton>
            </div>
            <hr />
<div className ="profile-details">
<MuiLink 
component ={ Link } 
to ={`/user/${handle}`} 
color="primary" variant="h5">
 @{handle}
</MuiLink>
{/* <div >
<hr/>
<Fragment color="primary">
<span className={classes.followersWrapper} colo="primary"><strong><i>Followers</i></strong></span>
<span className={classes.followingWrapper}><strong><i>Following</i></strong></span>
</Fragment>
</div>
<hr/> */}
<hr/>
    {bio && <Typography variant='body2'>{bio}</Typography>}
    <hr/>  
    {location && (
<Fragment>
    <hr />
<LocationOn color="primary"/> <span>{location}</span>
</Fragment>
    )}
<hr />
{website && (
    <Fragment>
    <LinkIcon color="primary" />
    <a href={website} target="_blank" rel="noopener noreferrer">
    {' '}{website}
    </a>
    <hr/>
    </Fragment>
)}  
<CalendarToday color="primary" /> {' '}
<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
</div>

<MyButton tip="Logout" onClick={this.handleLogout}>
<KeyboardReturn color="primary" />
</MyButton>

<EditDetails />

            </div>
        </Paper>
    ) : (
        <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
                No profile found, please login or signup!
            </Typography>
<div className={classes.buttons} >
    <Button variant="contained" color="primary" component={Link} to="/login">
        Login
    </Button>
    <Button variant="contained" color="secondary" component={Link} to="/signup">
        SignUp
    </Button>
</div>
        </Paper>
    )) : (<ProfileSkeleton />)

        return profileMarkup;
    }
}


Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
    })
    
    const mapActionsToProps = { 
    logoutUser, 
    uploadImage
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));

//yarn add @material-ui/icons
//Mui components are in pascal case