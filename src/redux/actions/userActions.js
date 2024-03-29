import { 
    SET_USER, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
 } from '../types';
 
import axios from 'axios';

// Login action

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    return axios.post('/auth/login', userData).then((res) => {
        console.log(res.data);
            // this.setState({
            //     loading: false
            // });
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
    }).catch((err) => {
        console.log(err);
        dispatch({
            type: SET_ERRORS,
        payload: err.response.data        
    })
    });
}


// Signup action
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/auth/signup', newUserData).then((res) => {
    console.log(res.data);
    // this.setState({
    //     loading: false
    // });
    setAuthorizationHeader(res.data.token)
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
    }).catch((err) => {
        console.log(err)
        dispatch({
            type: SET_ERRORS,
        payload: err.response.data
    })
    });
}

// logout action
export const logoutUser = () => (dispatch) => {
localStorage.removeItem('FBIdToken');
delete axios.defaults.headers.common['Authorization'];
dispatch({ type: SET_UNAUTHENTICATED })
}

// Get a user data action
export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user').then((res) => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    }).catch(err => console.log(err));
}

// upload image action
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER});
    axios.post('/user/image', formData).then(() => {
        dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// Edit user action
export const editUserDetails = (userDetails) => (dispatch) => {
dispatch({ type: LOADING_USER });
axios.post('/user', userDetails).then(() => {
    dispatch(getUserData());
}).catch((err) => console.log(err));
}

// Notifications action
export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios.post('/notifications', notificationIds).then((res) => {
        dispatch({
            type: MARK_NOTIFICATIONS_READ
        })
    }).catch((err) => console.log(err));

}
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken );
    axios.defaults.headers.common['Authorization'] = FBIdToken;

}