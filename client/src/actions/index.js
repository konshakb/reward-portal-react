import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';
import { ROOT_URL } from '../constants';

export const getEmployee = (callback) => async dispatch => {
    try {
        const response = await axios.get(`${ROOT_URL}/employee`);

    }
    catch(e) {

    }
}

export const getRecipients = (result) => async dispatch => {
    try {
        return await axios.get(`${ROOT_URL}/getemployees`);
    }
    catch(e) {
        console.log("error getting users") 
    }
}

export const getAwards = (user_id) => async dispatch => {
    try {
        return await axios.get(`${ROOT_URL}/getawards`, {
            params: {
                user_id: user_id
            }
        });
    }
    catch(e) {
        console.log("error getting awards") 
    }
}

export const deleteAwards = (award_ids, callback) => async dispatch => {
    try {
        const response = await axios.delete(`${ROOT_URL}/deleteawards`, {
            data: {
                award_ids: award_ids
            }
        });
        callback();

    }
    catch(e) {
        console.log("error deleting awards") 
    }
}

export const createUser = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`${ROOT_URL}/signup`, formProps);
        // dispatch({});
        callback();
    }
    catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
}

// does the job, but not sure of the correct dispatch call
export const createAward = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`${ROOT_URL}/createaward`, formProps);
        callback(); // User redirected to feature page
    }
    catch(e) {
        console.log("error creating award") 
        console.log(formProps)
        //dispatch({ type: GET_EMPLOYEE, payload: 'Must be a user to create award' });
    }
}




export const signup = (formProps, callback) => async dispatch => {
    // formProps contains { email: '', password: '' }
    try {
        const response = await axios.post(`${ROOT_URL}/signup`, formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token); // Persists user login status through localStorage
        callback(); // User redirected to feature page
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    // formProps contains { email: '', password: '' }
    try {
        const response = await axios.post(`${ROOT_URL}/signin`, formProps);
        // TODO: Send admin status from response to Redux
        console.log('response from actions', response);
        dispatch({ type: AUTH_USER, payload: response.data.token, admin: response.data.admin, user_id: response.data.user['user_id'] });
        localStorage.setItem('token', response.data.token); // Persists user login status through localStorage
        callback(); // User redirected to feature page
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login' });
    }
};

export const signout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_USER,
        payload: ''
    }
};