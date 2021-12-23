import { APIUrls } from "../helpers/urls";
import { AUTHENTICATE_USER, CLEAR_AUTH_STATE, EDIT_USER_FAILED, EDIT_USER_SUCCESSFUL, LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, LOG_OUT } from "./actionTypes";
import { SIGNUP_FAILED, SIGNUP_START, SIGNUP_SUCCESS } from "./actionTypes";
import { getFormBody } from "../helpers/utils";
import {getAuthTokenFromLocalStorage} from "../helpers/utils";


export function startLogin(){
    return{
        type:LOGIN_START
    }
}

export function loginFailed(errorMessage){
    return{
        type:LOGIN_FAILED,
        error:errorMessage
    }
}


export function loginSuccess(user){
    return{
        type:LOGIN_SUCCESS,
        user
    }
}

export function startSignup(){
    return{
        type:SIGNUP_START
    }
}

export function signupFailed(errorMessage){
    return{
        type:SIGNUP_FAILED,
        error:errorMessage
    }
}


export function signupSuccess(user){
    return{
        type:SIGNUP_SUCCESS,
        user
    }
}

export function login(email,password){
    return (dispatch) =>{

        dispatch(startLogin());

        const url = APIUrls.loginURL();
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },  //THIS API IS MADE IS SUCH A WAY THAT IT REQUIRE DATA IN URL-FORM-ENCODED FORMAT BY DEFAULT IT IS JSON
            body: getFormBody({email,password})  // in utils.js file // WE NEED TO CONVERT THE URL AND PASSWORD IN URL-ENCODED-STRING LIKE :- "/login?email=a@a.com&password=13212"
        })
        .then(response => response.json())
        .then((data) => {
            console.log('edit user data',data);
            if(data.success){
                //dispatch action to save user
                localStorage.setItem('token',data.data.token); // TO AVOID LOGING OUT OF USER ON PAGE REFRESH
                console.log('token',data.data.token);
                
                dispatch(loginSuccess(data.data.user)); 
                return;
            }
            dispatch(loginFailed(data.message));
        }) 
        ;
    }
}


export function signup(name,email,password,confirmPassword)
{
    return (dispatch) => {

        dispatch(startSignup());

        const url = APIUrls.signupURL();
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:getFormBody({email,
                name,
                password,
                confirm_password:confirmPassword,
            })

        })
        .then( (response) => response.json())
        .then( (data) => {
            console.log(data);
            if(data.success){
                dispatch(signupSuccess(data.data.user));
                return;
            }
            dispatch(signupFailed(data.message));
        })
    }
}

export function authenticateUser(user){
    return{
        type : AUTHENTICATE_USER,
        user
    }
}


export function logOutUser(){
    return{
        type : LOG_OUT,
        
    }
}

export function clearAuthState(){
    return{
        type : CLEAR_AUTH_STATE,
        
    }
}

export function editUserFailed(error){
    return{
        type : EDIT_USER_FAILED,
        error
        
    }
}

export function editUserSuccessful(user){
    return{
        type : EDIT_USER_SUCCESSFUL,
        user
    }
}

export function editUser(name, password,confirmPassword,userId){
    return (dispatch) => {
        const url = APIUrls.editProfileURL();



        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                Authorization:`Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            body:getFormBody({
                name,
                password,
                confirm_password:confirmPassword,
                id:userId,
            })

        })
        .then( (response) => response.json())
        .then( (data) => {
            console.log(data);
            if(data.success){
                dispatch(editUserSuccessful(data.data.user));
                
            
                if(data.data.token){
                    localStorage.setItem('token',data.data.token);
                    
                }
                return 
        }

           
            dispatch(editUserFailed(data.message));
        })




        
    }
}