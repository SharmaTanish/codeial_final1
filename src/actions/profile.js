import { FETCH_USER_PROFILE, USER_PROFILE_SUCCESS,USER_PROFILE_FAILURE } from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import {getAuthTokenFromLocalStorage} from '../helpers/utils';

export function userProfileSuccess (user){
    return {
        type:USER_PROFILE_SUCCESS,
        user
    }
}
export function userProfileFailed (user){
    return {
        type:USER_PROFILE_FAILURE,
        user
    }
}
export function startUserProfileFetch (user){
    return {
        type:FETCH_USER_PROFILE ,
        user
    }
}

export function fetchUserProfile(userId){
    return (dispatch) => {
        dispatch(startUserProfileFetch());

        const url =  APIUrls.userProfile(userId);

        fetch(url,{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                 Authorization:`Bearer ${getAuthTokenFromLocalStorage()}`,

            }, 
          })
        .then(response => response.json())
        .then((data) => {
            dispatch(userProfileSuccess(data.data.user));
            // also handle failure part
        }) 
        ;

    }
}
