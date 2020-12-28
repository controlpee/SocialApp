import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';
// import AddPhoto from '../scream/AddPhoto';
// import PostScream from './PostScream';

// Redux stuff
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

//MIU stuffs
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';



const styles = (theme) => ({
    ...theme.themeObject,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
})


class PostScream extends Component {

    state = {
        open: false,
        body: '',
        errors: {}
    }

componentWillReceiveProps(nextProps) {
 if(nextProps.UI.errors) {
    this.setState({
       errors:  nextProps.UI.errors
    });
 }
 if(!nextProps.UI.errors && !nextProps.UI.loading) {
     this.setState({body: '', open: false, errors: {} });
 }
}

handleOpen = () => {
 this.setState({
     open: true
 });
    }
handleClose = () => {
        this.props.clearErrors();
        this.setState({
            open: false, 
            errors: {}
        });
    }
handleChange = (event) => {
    this.setState({ [event.target.name] :  event.target.value  });
    }
handleSubmit = (event) => {
  event.preventDefault();
  this.props.postScream({ body: this.state.body})

    }
    render() {
     const   { errors } = this.state;
     const   { classes, UI: {loading}} = this.props;
        return (
           <Fragment>
                <MyButton 
                onClick={ this.handleOpen } 
                tip="Post Update!">
                <AddIcon />
                </MyButton>
                <Dialog 
                open={ this.state.open } 
                onClose={ this.handleClose } 
                fullWidth 
                maxWidth="sm"
                >
                <MyButton 
                tip ="Close" 
                onClick={ this.handleClose } 
                tipClassName={classes.closeButton}
                >
                <CloseIcon />
                </MyButton>
                <DialogTitle>Post an update!</DialogTitle>
                <DialogContent>
                 <form noValidate onSubmit={ this.handleSubmit }>
                    <TextField
                     name="body"
                     type="text"
                     label = "Update!!!"
                    mutiline
                    row="3"
                    placeholder="New update"
                    error = {errors.body ? true : false }
                    helperText = {errors.body }
                    className={classes.textField}
                    onChange={ this.handleChange }
                    fullWidth
                    />
                <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                className={classes.submitButton} 
                disabled={ loading }>
                    Post
                    {loading && (
                     <CircularProgress size={30} 
                     className={classes.progressSpinner} />
                    )}
                    {/* <hr className={classes.hiddenSeparator}/>
                    <span><AddPhoto imageId={imageId}/></span> */}
                </Button>
                </form>   
                </DialogContent>
                </Dialog>
           </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapActionsToProps = {
    postScream, 
    clearErrors
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream))
