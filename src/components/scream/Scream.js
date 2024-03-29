import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';


// Redux

import { connect } from 'react-redux';


// MUI stuff
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// Icons
import ChatIcon from '@material-ui/icons/Chat';




// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions'


const styles = {
  card: {
      position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
image: {
    minWidth: 200,
    borderRadius: 5
},
content: {
    padding: 25,
    backgroundSize: "cover"
}
}
class Scream extends Component {

    render() {

    dayjs.extend(relativeTime)

const { 
    classes, 
    scream: { 
        body, 
        createdAt, 
        userImage, 
        userHandle, 
        screamId, 
        likeCount, 
        commentCount 
    }, 
    user: {authenticated,  credentials: { handle } }
} = this.props

const deleteButton = authenticated && userHandle === handle ? (
<DeleteScream screamId={screamId} />
) : null

return (

<Card 
className = {classes.card}>
<CardMedia image = {userImage} 
title = 'Profile Image' 
className = {classes.image} />
<CardContent 
className = {classes.content} >
<Typography 
variant = "h5" 
component ={Link} 
to = {`/user/${userHandle}`} 
color="primary">
{userHandle}
</Typography>
{deleteButton}
<Typography 
variant = "body2" 
color = "textSecondary"> 
{dayjs(createdAt).fromNow()} 
</Typography>
<Typography 
variant = "body1">{body}</Typography>
<LikeButton screamId={screamId} />
<span>{likeCount} Likes </span>

<MyButton tip="comment">
<ChatIcon color="primary" />
</MyButton>

<span>{commentCount} Comments</span>
<ScreamDialog 
screamId={screamId} 
userHandle={userHandle} 
openDialog={this.props.openDialog} />
</CardContent>
</Card>
        )
    }
}
Scream.propTypes = {
user: PropTypes.object.isRequired,
scream: PropTypes.object.isRequired,
classes: PropTypes.object.isRequired,
openDialog: PropTypes.bool

}

const mapStateToProps = (state) => ({
    user: state.user

})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
