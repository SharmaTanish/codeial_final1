import { APIUrls } from '../helpers/urls';
import {ADD_POST, UPDATE_POSTS,ADD_COMMENT, UPDATE_POST_LIKE} from './actionTypes';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';

export function fetchPosts(){
    return (dispatch) => {
        // const url = "https://baconipsum.com/api/?callback=?";
        // const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=5'; // NOT WORKING
        // const url = 'http://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5'  // WORKING
        const url = APIUrls.fetchPostsURL();
        fetch(url).then((response) => {
            // console.log(response); // NOT JSON OBJECT
            return response.json();
        }).then((data) => {
            console.log("data ", data);
            dispatch(update_posts(data.data.posts));
        })
    }
}


export function update_posts(posts){
    return {
        type:UPDATE_POSTS,  // INSTEAD OF TAKING IT AS STRING DIRECTLY OVER HERE , WE STORE IT IN A VARIABLE IN ACTIONTYPES AND USE THIS  VARIABLE OVER HERE, SINCE EASY TO CHANGE IN FUTURE
        posts
    }
}

export function addPost(post){
    return{
        type:ADD_POST,
        post
    }
}

export function createPost(content,auth){  // NEW POST IS STORED IN DATABASE BY API, BUT WE ARE JUST STORING IT IN DATABSE BY API , NOT FECHING ALL POSTS AGAIN BY API (SINCE FROM API WE GET RANDOM POSTS, MAY OR MAY NOT GET OUR RECENTLY CREATED POSTS), HENCE WE ABLE TO SEE OUR RECENTLY POSTED POST BY STORIG AND GETTIG FROM REDUX STORE, SINCE WE ARE STORING EVERYTHING IN STORE AFTER FETCHING THROUGH API!
    if(!auth.isloggedin){
        alert("please login first!!");
    }
    return (dispatch) => {
        const url =  APIUrls.createPost();

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                 Authorization:`Bearer ${getAuthTokenFromLocalStorage()}`,

            }, 
            body:getFormBody({content})
          })
          .then((response) => response.json())
          .then((data) =>  {
            if(data.success){
                dispatch(addPost(data.data.post));
            }
        })
    }
}



export function createComment(content,postId,auth){ 
    if(!auth.isloggedin){
        alert("please login first!!");
    }
        return (dispatch) => {
        const url =  APIUrls.createComment();
        console.log("action",postId);

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                 Authorization:`Bearer ${getAuthTokenFromLocalStorage()}`,

            }, 
            body:getFormBody({post_id:postId,content})  // these should we as it is in name ,i.e., in place of 'content' we can't write let say 'comment' ,i.e any other string also should not differ in case as well!       
        })
          .then((response) => response.json())
          .then((data) =>  {
            if(data.success){
                console.log("action");
                dispatch(addComment(data.data.comment,postId));
            }
        })
    }
}

export function addComment(comment,postId){
    return {
        type:ADD_COMMENT,
        comment, 
        postId, // post at wich comment is added
    }
}

export function addLike(id,likeType,userId,auth){  // using single api for togggling the like of post and comment both
    if(!auth.isloggedin){
        alert("please login first!!");
    }
    return (dispatch) => {
        const url = APIUrls.toggleLike(id,likeType);
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                 Authorization:`Bearer ${getAuthTokenFromLocalStorage()}`,

            },      
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.success){
                dispatch(addLikeToStore(id,userId));
            }
        })
    }
}

export function addLikeToStore(postId,userId){
    return{
    type : UPDATE_POST_LIKE,
    postId,
    userId
    }
}

