import React, { Component } from 'react';
import { createPost } from '../actions/posts';
import { connect } from 'react-redux';

class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state={
            content:'',
        }

    }

    handleChange = (e) =>{
        this.setState(
            {
                content:e.target.value,
            }
        )
    }

    handleOnChange = () => {
        // dispatch action
        this.props.dispatch(createPost(this.state.content,this.props.auth));
        this.setState({
            content:''
        })
    }

    render() {
        return (
            <div className="create-post" >
            <textarea className="add-post" placeholder="Start writing a post..." onChange={this.handleChange} value={this.state.content} ></textarea>
            <div>
                <button id="add-post-btn" onClick={this.handleOnChange} > Add Post</button>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps)(CreatePost); //HERE AS NOT PASSING ANY MAPSTATETOPROPS FUNCTION, AS BYDEFAULT TO GIVES US DISPATCH ONLY , THAT THE ONLY ONE WE EEDED HERE