import * as UT from './userTypes'
import axios from "axios";


const REGISTER_URL = 'http://localhost:8080/users/add';


export const fetchUsers = () => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("http://localhost:8080/users/view",{
            headers:{
                'Authorization':'Bearer ' + localStorage.getItem('jwtToken')
            }
        })
            .then(response => {
                dispatch(userSuccess(response.data))
            })
            .catch(error => {
                dispatch(userFailure(error.message))
            })
    }
}

export const getUserInfo = () => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("http://localhost:8080/users/role",{
            headers:{
                'Authorization':'Bearer ' + localStorage.getItem('jwtToken')
            }
        })
            .then(response => {
                dispatch(userSuccess(response.data))
            })
            .catch(error => {
                dispatch(userFailure(error.message))
            })
    }
}


export const registerUser = (userObj) => async (dispatch) => {
    dispatch(userRequest())
    try {
        const response = await axios.post(REGISTER_URL, userObj, {
            headers:{
                'Authorization':'Bearer ' + localStorage.getItem('jwtToken')
            }
        })
        dispatch(userSavedSuccess(response.data))
        return Promise.resolve(response.data)
    } catch(error) {
        dispatch(userFailure(error.message))
        return Promise.reject(error)
    }
}

const userRequest = () => {
    return {
        type: UT.USER_REQUEST
    }
}

const userSavedSuccess = (user) => {
    return {
        type: UT.USER_SAVED_SUCCESS,
        payload: user
    }
}

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
