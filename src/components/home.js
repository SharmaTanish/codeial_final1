import React,{Component} from "react";
import PostsList from './postsList'
import FriendsList from "./friendsList";

class Home extends Component {
    render() { 
        return ( 
            <div className="home" >
                <PostsList posts= {this.props.posts}/>
                {this.props.isLoggedin && <FriendsList friends={this.props.friends} />}

            </div>
         );
    }
}

export default Home;