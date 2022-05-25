import * as UT from './userTypes'
import axios from "axios";

<<<<<<< HEAD
=======
const REGISTER_URL = 'http://localhost:8080/user/register';

>>>>>>> efa52a9 (frontend fix)

export const fetchUsers = () => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
            .then(response => {
                dispatch(userSuccess(response.data))
            })
            .catch(error => {
                dispatch(userFailure(error.message))
            })
    }
}

<<<<<<< HEAD
export const registerUser = (userObj) => {
    return dispatch => {
        dispatch(userRequest())
        axios.post("http://localhost:8080/user/register", userObj)
            .then(response => {
                dispatch({
                    type: UT.USER_SAVED_SUCCESS,
                    payload: response.data.message
                })
            })
            .catch(error => {
                dispatch(userFailure(error.message))
            })
=======
export const registerUser = (userObj) => async (dispatch) => {
    dispatch(userRequest())
    try {
        const response = await axios.post(REGISTER_URL, userObj)
        dispatch(userSavedSuccess(response.data))
        return Promise.resolve(response.data)
    } catch(error) {
        dispatch(userFailure(error.message))
        return Promise.reject(error)
>>>>>>> efa52a9 (frontend fix)
    }
}

const userRequest = () => {
    return {
        type: UT.USER_REQUEST
    }
}

<<<<<<< HEAD
=======
const userSavedSuccess = (user) => {
    return {
        type: UT.USER_SAVED_SUCCESS,
        payload: user
    }
}

>>>>>>> efa52a9 (frontend fix)
const userSuccess = users => {
    return {
        type: UT.USER_SUCCESS,
        payload: users
    }
}

const userFailure = error => {
    return {
        type: UT.USER_FAILURE,
        payload: error
    }
}