import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// import bgImage from '../images/fbg.JPG';

// import AppIcon from '.././images/ApppIcon.png';

// Redux stuffs
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

// import stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/textField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = (theme) => ({
    ...theme.themeObject,
    backgroundImage: {
        width: '100%',
        backgroundSize: 'cover',
        position: 'absolute',
        float: 'right'
        }
});



class login extends Component {

    constructor() {
        super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    }
 
    handleSubmit = ($event) => {
    $event.preventDefault();
    
    const userData = {
        email: this.state.email,
        password: this.state.password
    }
 this.props.loginUser(userData, this.props.history);
};
    handleChange = (event) => {
    this.setState({
    [event.target.name]: event.target.value
    }); 
    }

    componentWillReceiveProps(nextProps) {
       if(nextProps.UI.errors) {
        this.setState({ errors: nextProps.UI.errors });
       }
     }
        render() {
    
        const { classes, UI: { loading } } = this.props;
        const errors  = this.state.errors;
    
            return (
    <Grid container 
    className={classes.form}
    >
    <Grid item sm ={4}/>
    {/* <img className={classes.backgroundImage} src={bgImage} alt=""/> */}

    <Grid item sm ={4}>
    <Typography 
    variant = "h2" 
    className={classes.pageTitle} >
    Login
    </Typography>
    
    <form novalidate onSubmit={this.handleSubmit} >

    <TextField 
    id ="email" 
    name = "email" 
    type = "email" 
    label = "Email" 
    className ={classes.textField} 
    helperText={ errors.email } 
    error={errors.email ? true : false}
    value={this.state.email} 
    onChange={this.handleChange} 
    fullWidth /> 
    
    <TextField 
    id ="password" 
    name = "password" 
    type = "password" 
    label = "Password" 
    className ={classes.textField} 
    helperText={ errors.password } 
    error={errors.password ? true : false}
    value={this.state.password} 
    onChange={this.handleChange} 
    fullWidth /> 
    {errors.general && (
    <Typography variant="body2" className={classes.customError} >
        {errors.general}
    </Typography>
    )}
    <Button 
    type="submit" 
    variant="contained" 
    color="primary" 
    className={classes.button}
    disabled={loading}
    >
    Login
    {loading && (<CircularProgress size={30} className={classes.progress} />
    )}
    </Button>
    <br />
    <br />
    
    <small>
        don't have an account? sign up <Link to="/signup">here</Link>
        </small>    
    </form>
     {/* <img src = {AppIcon} alt = "Monkey" className={classes.image}/> */}
    </Grid>
    <Grid item sm />
    
    </Grid>
            )
        }
    }
  
    
    login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired    
    }
    
    const mapStateToProps = (state) => ({
        user: state.user,
        UI: state.UI
    });
    const mapActionsToProps = {
        loginUser
    }
    export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));