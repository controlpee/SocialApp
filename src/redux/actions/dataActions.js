import { 
    SET_SCREAMS, 
    LOADING_DATA, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM , 
    DELETE_SCREAM, 
    POST_SCREAM, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_ERRORS, 
    SET_SCREAM, 
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    DELETE_COMMENT
     } from '../types';
import axios from 'axios';


// Get all Screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
axios.get('/feed').then((res) => {
    console.log(res.data);
       dispatch({ 
        type: SET_SCREAMS,
        payload: res.data
    });
    }).catch(
        () => dispatch({ 
            type: SET_SCREAMS,
            payload: []
    }))
}

// Get a Scream
export const getScream = (screamId) => (dispatch) => {
dispatch({type: LOADING_UI})
axios.get(`/article/${screamId}`).then((res) => {
dispatch({
    type: SET_SCREAM,
    payload: res.data
});
dispatch({type: STOP_LOADING_UI});
}).catch((err) => console.log(err));
}
// Post Scream

export const postScream = (newScream) => (dispatch) => {
 dispatch({type: LOADING_UI });
 axios.post('/article/', newScream).then((res) => {
     dispatch({
         type: POST_SCREAM,
         payload: res.data
        });
    dispatch(clearErrors());
 }).catch((err) => {
    console.log(err)
    dispatch({
        type: SET_ERRORS, 
        payload: err.response.data
    });
 });

}

// like a scream
export const likeScream = (screamId) => (dispatch) => {
    axios.get(`/article/${screamId}/like`).then((res) => {
        console.log(res.data);
            dispatch({ 
                type: LIKE_SCREAM,
                payload: res.data
            });

        }).catch((err) => console.log(err));
}

// unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
    axios.get(`/article/${screamId}/unlike`).then((res) => {
        console.log(res.data);
            dispatch({ 
                type: UNLIKE_SCREAM,
                payload: res.data

        });
        }).catch((err) => console.log(err));
}


// Submit comment
export const submitComment = (screamId, commentData) => (dispatch) => {
axios.post(`/article/${screamId}/comment`, commentData).then((res) => {
    dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
    });
dispatch(clearErrors());
}).catch((err) => {
    console.log(err);
    dispatch({
        type: SET_ERRORS,
        payload: err.response.data
    });
});
}

// Get user Data
export const getUserData = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${userHandle}`).then((res) => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        })
    }).catch(() => {
        dispatch({
            type: SET_SCREAMS,
            payload: null
        });
    });
}


// Delete scream
export const deleteScream = (screamId) => (dispatch) => {
axios.delete(`/article/${screamId}`).then(() => {
dispatch({
    type: DELETE_SCREAM,
    payload: screamId
});
}).catch(
    (err) => console.log(err));
}


// Delete comment
export const deleteComment = (screamId,  commentId) => (dispatch) => {
axios.delete(`/article/${screamId}/comment/${commentId}`).then(() => {
    dispatch({
        type: DELETE_COMMENT, 
        payload: commentId
    });
}).catch((err) => console.log(err));
}



// Clear errors
export const clearErrors = () => (dispatch) => {
dispatch({type: CLEAR_ERRORS});
}