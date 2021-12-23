import { FETCH_USER_PROFILE, USER_PROFILE_FAILURE, USER_PROFILE_SUCCESS } from "../actions/actionTypes";

const initialProfileState={
    user:{},
    error:null,
    success:null,
    inProgress:false,

}


export default function profile(state=initialProfileState,action){  // good to give initial default state as if in case state passes undefined type then our program not throw error and consider default state
    switch(action.type){
    case USER_PROFILE_SUCCESS:
        return {
            ...state,
            user:action.user,
            inProgress:false,
            error:null,
            success:true
        }; // THIS WILL BE NOW NEW STATE
    
    case USER_PROFILE_FAILURE:
        return {
            ...state,
            inProgress:false,
            error:action.error,
        };

    case FETCH_USER_PROFILE:
        return {
            ...state,
            inProgress:true,
        };

    default:
        return state;
    }
}
