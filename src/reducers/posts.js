import { ADD_COMMENT, ADD_POST, UPDATE_POST_LIKE } from "../actions/actionTypes";
import { UPDATE_POSTS } from "../actions/actionTypes";

export default function posts(state=[],action){  // good to give initial default state as if in case state passes undefined type then our program not throw error and consider default state
    switch(action.type){
    case UPDATE_POSTS:
        return action.posts; // THIS WILL BE NOW NEW STATE
    case  ADD_POST:
        return [action.post,...state];
    case ADD_COMMENT:
        const newPosts = state.map((post) =>{
            if(post._id===action.postId){
                return {
                    ...post,
                    comments:[action.comment,...post.comments]
                }
            }
            return post;
        })
        return newPosts;

        case UPDATE_POST_LIKE:
            const updatedPosts = state.map((post) =>{
                if(post._id===action.postId){
                    return {
                        ...post,
                        likes:[action.userId,...post.likes]
                    }
                }
                return post;
            })
            return updatedPosts;

    default:
        return state;
    }
}



