import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { submitComment, clearErrors} from '../../redux/actions/dataActions';

// MIU stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';




const styles = (theme) => ({
    ...theme.themeObject
})


class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }

componentWillReceiveProps(nextProps) {
if (nextProps.UI.errors) {
this.setState({errors: nextProps.UI.errors});

};
if (!nextProps.UI.errors && !nextProps.UI.loading) {
    this.setState({body: '', errors: {} });
};
};

handleSubmit = (event) => {
event.preventDefault();
this.props.submitComment(this.props.screamId, { body: this.state.body });

}
handleChange = (event) => {
this.setState({[event.target.name ] : event.target.value});
}
    render() {
        const { classes, authenticated } = this.props;
        const { errors } = this.state;
const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{textAlign: 'center'}}> 
        <form noValidate onSubmit={this.handleSubmit}>
  <TextField
    name="body"
    type="text"
    label="Comment on post"
    error={errors.comment ? true : false}
    helperText={errors.comment} 
    value={this.state.body}
    onChange={this.handleChange}
    className={classes.textField}
    fullWidth />
<Button 
type="submit" 
variant="contained" 
className={classes.button} 
color="primary"
>
Submit
</Button>
  </form>
<hr className={classes.visibleSeparator} />
    </Grid>
) : null    
return commentFormMarkup
    }
}

CommentForm.propTypes = {
clearErrors: PropTypes.func.isRequired,
submitComment: PropTypes.func.isRequired,
authenticated: PropTypes.bool.isRequired,
UI: PropTypes.object.isRequired,
classes: PropTypes.object.isRequired,
screamId: PropTypes.string.isRequired

}

const mapActionsToProps ={
    submitComment,
    clearErrors
}
const mapStateToProps = (state) => ({
UI: state.UI,
authenticated: state.user.authenticated
})
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm))
