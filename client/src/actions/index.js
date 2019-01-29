import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
    // formProps contains { email: '', password: '' }
    try {
        const response = await axios.post('http://localhost:3001/signup', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token); // Persists user login status through localStorage
        callback(); // User redirected to feature page
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' })
    }
};