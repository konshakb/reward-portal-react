import { AUTH_USER, AUTH_ERROR } from '../actions/types';
const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '',
    admin: ''
};

export default function(state = INITIAL_STATE, action) {
    console.log("action", action);
    switch(action.type) {
        case AUTH_USER:
            return { ...state, authenticated: action.payload, admin: action.admin, user_id: action.user_id };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};