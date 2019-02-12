import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';
import { ROOT_URL } from '../constants';

export const getEmployee = (callback) => async dispatch => {
    try {

    }
    catch(e) {

    }
}

export const createUser = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3001/signup', formProps);
        // dispatch({});
        callback();
    }
    catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
}

export const signup = (formProps, callback) => async dispatch => {
    // formProps contains { email: '', password: '' }
    try {
        const response = await axios.post('http://localhost:3001/signup', formProps);
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
        const response = await axios.post('http://localhost:3001/signin', formProps);
        // TODO: Send admin status from response to Redux
        console.log('response from actions', response);
        dispatch({ type: AUTH_USER, payload: response.data.token, admin: response.data.admin });
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