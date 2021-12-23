import { FETCH_SEARCH_RESULTS_SUCCESS } from "./actionTypes";
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from "../helpers/utils";

export function searchUsers(searchText,auth){
    if(!auth.isloggedin){
        alert("please login first!!");
    }
    return (dispatch) =>{
    const url = APIUrls.userSearch(searchText);
    fetch(url,{
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
             Authorization:`Bearer ${getAuthTokenFromLocalStorage()}`,

        },      
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.success){
            dispatch(searchResultsSuccess(data.data.users));
        }
        else{
            dispatch(searchResultsSuccess([]));
        }
    })
}
}

export function searchResultsSuccess(users){
    return{
        type:FETCH_SEARCH_RESULTS_SUCCESS,
        users
    }
}