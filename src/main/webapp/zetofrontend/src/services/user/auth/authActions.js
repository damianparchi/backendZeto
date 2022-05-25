import * as AT from "./authTypes";
import axios from "axios";
<<<<<<< HEAD
export const authenticateUser = (email, password) => {
    const credentials = {
        email: email,
        password: password
    }
    return dispatch => {
        dispatch({
            type: AT.LOGIN_REQUEST
        });
        axios.post("http://localhost:8080/user/authenticate", credentials)
            .then(response => {
                let token = response.data.token;
                localStorage.setItem('jwtToken', token);
                dispatch(success({username: response.data.name, isLoggedIn: true }));
            })
            .catch(error => {
                dispatch(failure());
            })
=======

const AUTH_URL = 'http://localhost:8080/user/authenticate';

export const authenticateUser = (email, password) => async (dispatch) => {
    dispatch(loginRequest())
    try {
        const response = await axios.post(AUTH_URL, {
            email: email,
            password: password,
        });
        localStorage.setItem('jwtToken', response.data.token);
        dispatch(success({username: response.data.name, isLoggedIn: true }));
        return Promise.resolve(response.data)
    } catch (error) {
        dispatch(failure());
        return Promise.reject(error)
>>>>>>> efa52a9 (frontend fix)
    }
}

export const logoutUser = () => {
<<<<<<< HEAD
    return dispatch => {
        dispatch({
            type: AT.LOGOUT_REQUEST
        });
        localStorage.removeItem('jwtToken');
        dispatch(success(false))
    }
}

=======
    return (dispatch) => {
        dispatch(logoutRequest());
        localStorage.removeItem('jwtToken');
        dispatch(success({username: '', isLoggedIn: false }))
    }
}

const loginRequest = () => {
    return {
        type: AT.LOGIN_REQUEST,
    }
}

const logoutRequest = () => {
    return {
        type: AT.LOGOUT_REQUEST,
    }
}


>>>>>>> efa52a9 (frontend fix)
const success = isLoggedIn => {
    return {
        type: AT.SUCCESS,
        payload: isLoggedIn
    };
};

const failure = () => {
    return {
        type: AT.FAILURE,
        payload: false
    };
};