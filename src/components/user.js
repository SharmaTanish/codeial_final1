import React from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../actions/profile";
import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import {addFriend, removeFriend} from '../actions/friends'
class User extends React.Component {
    constructor(props){
        super(props);
        this.state={
            success:null,
            error:null,
            successMessage:null,
        }
    }
    componentDidMount(){
        const {match} = this.props;
        if(match.params.userId){
            // dispatch an action
            this.props.dispatch(fetchUserProfile(match.params.userId));
            
        }
    }


    //when searching a user and cicking on it to move to his profile, first
    //time we go to the profile but now if search another user, then url is 
    //changing but the content on screen is shown of previous user only even 
    //after clikcing on new user. since url is changing means component is 
    //changing but not updated on screen, so in such cases we use componentDidUpdate()
    // method, like this :-
    componentDidUpdate(prevProps) {
        const {
            match: {params:prevParams}  // renaming params to prevParams and using destructing side by side
        } = prevProps;

        const {
            match:{params:currentParams}
        } = this.props;

        if(prevParams && currentParams && prevParams.userId !== currentParams.userId){
            this.props.dispatch(fetchUserProfile(currentParams.userId));
        }

    }



    checkIfUserIsAFriend = () => {
        const {match,friends} = this.props;
        const userId=match.params.userId;

        const index = friends.map(friend => friend.to_user._id).indexOf(userId);

        if(index!==-1){
            return true;
        }
        else{
            return false;
        }



    }


    handleAddFriendClick = async () => {  // MUST WRITE async KEYWORD WHEN USING await IN THE FUNCTION
        // ANOTHER MEYHOD OF MAKING ASYNC API CALLS WITHOUT USING .then() BY USING async AND  await KEYWORDS!
        const userId = this.props.match.params.userId;
        const url =APIUrls.addFriend(userId);

        const options = {
            method:'POST',
            // mode:"no-cors",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                Authorization:`Bearer ${getAuthTokenFromLocalStorage()}`,
            }
        }

        fetch(url,options)
        .then( (responce) =>responce.json())
        .then((data) =>{
            if(data.success){
                this.setState({
                    success:true,
                    successMessage:"Added Friend Successfully!"
            
                })
                this.props.dispatch(addFriend(data.data.friendship));
            }
            else{
                this.setState({
                    success:null,
                    error:data.message,
                })
            }
        }
        )
        .catch(
            (error) =>{ console.log(error);}
        ); // await WILL WAIT FOR THE FETCH TO COMPLETE
       
       
        // const data = await responce.json();

        // if(data.success){
        //     this.setState({
        //         success:true,
        //         successMessage:"Added Friend Successfully!"
        
        //     })
        //     this.props.dispatch(addFriend(data.data.friendship));
        // }
        // else{
        //     this.setState({
        //         success:null,
        //         error:data.message,
        //     })
        // }



    }


    handleRemoveFriendClick = async () => {  // MUST WRITE async KEYWORD WHEN USING await IN THE FUNCTION
        // ANOTHER MEYHOD OF MAKING ASYNC API CALLS WITHOUT USING .then() BY USING async AND  await KEYWORDS!
        const userId = this.props.match.params.userId;
        const url =APIUrls.removeFriend(userId);

        const options = {
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                Authorization:`Bearer ${getAuthTokenFromLocalStorage()}`,
            }
        }

        const responce = await fetch(url,options); // await WILL WAIT FOR THE FETCH TO COMPLETE
        const data = await responce.json();

        if(data.success){
            this.setState({
                success:true,
                successMessage:"Removed Friend Successfully!"
        
            })
            this.props.dispatch(removeFriend(userId));
        }
        else{
            this.setState({
                success:null,
                error:data.message,
            })
        }



    }


    render() { 


        console.log(this.props);
        const {
            match:{params},
            profile,
        } = this.props;
        const user = profile.user;
        console.log("params",params);

        if(profile.inProgress){
            return <h1>Loading!!</h1>;
        }

        const isUserAFriend= this.checkIfUserIsAFriend();
        const {success,error,successMessage} = this.state;
        return (
            <div className="settings" >

            <div className="img-container" >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="user-dp"
            />
            </div>
            <div className="field" >
                    <div className="field-label" > Name </div>
                    <div className="field-value" >{user.name}</div>
            </div>
            <div className="field" >
                    <div className="field-label" > Email </div>
                    <div className="field-value" >{user.email}</div>
            </div>
            <div className="btn-grp">
            {isUserAFriend ? 
                <button className="button save-btn" onClick={this.handleRemoveFriendClick} >Remove Friend</button>
                :
                <button className="button save-btn" onClick={this.handleAddFriendClick} >Add Friend</button>

            }

            {success && <div className="alert success-dailog" >{successMessage}</div>}
            {error && <div className="alert error-dailog" >{error}</div>}

            </div>
            </div>


        )
    }
}
 
function mapStatetoProps({profile,friends}){
    return {
        profile,
        friends,
    }
}
export default connect(mapStatetoProps)(User);