import React from 'react';
import { Link } from 'react-router-dom';

import Comments from './comment';

import { connect } from 'react-redux';
import { addLike, createComment } from '../actions/posts';

class Post extends React.Component {

    constructor(props){
        super(props);
        this.state={
          comment:'',
        }
      }
    
      handleAddComment=(e)=>{
        const {comment} = this.state;
        const {post} =  this.props;
    
        if(e.key==='Enter'){
           
          this.props.dispatch(createComment(comment,post._id,this.props.auth));
          this.setState({
            comment:'',
          })
        }
       
        
      }
    
      handleCommentChange = (e) =>{
        this.setState({
          comment:e.target.value
        })
      }

      handlePostLike=() =>{
        const {post,user} =  this.props;
        this.props.dispatch(addLike(post._id,'Post',user._id,this.props.auth)) // written likeType = 'Post' , since liking a post , therefore writing this according to API docs.

      }
    
    render() { 
        const{post,user}= this.props;
        const {comment} = this.state;

        const isPostLikedByUser = post.likes.includes(user._id); // since storing userId in likes array

        return (
        <div className="post-wrapper" key={post._id}> 
            <div className="post-header">
              
                <div className="post-avatar">
                <Link to={`/user/${post.user._id}`}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="user-pic"
                  />
                  </Link>
                  <div>
                
                  <span className="post-author">{post.user.name}</span>
                  <span className="post-time">a minute ago</span>
                </div>
              </div>
              <div className="post-content">{post.content}</div>

              <div className="post-actions">  {/* problem in the API, 1. actually on again click it is toggling the like, but visually in frontend it increases the count    2. on refresh the page, red heart go away as , since actually in backend it is storing object_id of like object created instead of user_id, therefore problem in backend! */}
                <button className="post-like no-btn" onClick={this.handlePostLike}>
                  {isPostLikedByUser
                    ?
                    <img // red heart image
                    src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                    alt="likes-icon"
                  />
                   :
                  <img // plain white heart image
                    src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                    alt="likes-icon"
                  />
                  }
                  <span>{post.likes.length}</span>
                </button>

                <div className="post-comments-icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="Start typing a comment" 
                onKeyPress={this.handleAddComment} 
                onChange={this.handleCommentChange}
                value={comment} 
                />
              </div>

              <div className="post-comments-list">
                {post.comments.map((comment) => (
                  <Comments comment={comment} key = {comment._id} postId = {post._id}/>
                ))}
              </div>
            </div>
          </div>
        );
    }
}
 

function mapStateToProps({auth}){
  return{
    user:auth.user,
    auth
  }
}

export default connect(mapStateToProps)(Post);