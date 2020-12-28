import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux stuff
import { connect } from 'react-redux';
import { deleteComment } from '../../redux/actions/dataActions';


// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutLine from '@material-ui/icons/DeleteOutline';

const styles = {

deleteButton: {
    position: 'absolute',
    left: '90%',
    bottom: '10%'

}
}


class DeleteComment extends Component {

    state = {
        open: false
    }
handleOpen = () => {
this.setState({
    open: true
})
}
handleClose = () => {
    this.setState({
        open: false
    })
    }
 deleteComment = () => {
     this.props.deleteComment(this.props.screamId)
        this.setState({
            open: false
        })
        }
    render() {
        const { classes, commentId } = this.props
        return (
            <Fragment>
            <MyButton tip= "Delete Comment" onClick={this.handleOpen} 
            btnClassName={classes.deleteButton}>
                <DeleteOutLine color="secondary" />
            </MyButton>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWith
            maxWidth="sm"
            >
            <DialogTitle>
            Are you sure you want to delete this comment ?
            </DialogTitle>
            <DialogActions>
            <Button onClick={ this.handleClose } color="primary">
            Cancel
            </Button>
            <Button onClick={ this.deleteComment } color="scondary">
            Delete
            </Button>
            </DialogActions>
            </Dialog>
            </Fragment>
        )
    }
}
DeleteComment.propTypes = {
deleteComment: PropTypes.func.isRequired,
classes: PropTypes.object.isRequired,
screamId: PropTypes.string.isRequired,
commentId: PropTypes.string.isRequired
}
export default connect(null, { deleteComment })(withStyles(styles)(DeleteComment))
