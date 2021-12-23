import React from "react";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import { clearAuthState } from "../actions/auth";
import { Redirect } from "react-router-dom";
class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            userName:'',
            email:'',
            password:'',
            confirmPassword:''
     }
    }

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }
     handleNameChange = (e) => {
         this.setState({
            userName:e.target.value
         })
     }

     handleEmailChange = (e) =>{
         this.setState({
             email:e.target.value
         })
     }


     handlePasswordChange = (e) =>{
        this.setState({
            password:e.target.value
        })
    }


     handleConfirmPasswordChange = (e) =>{
        this.setState({
            confirmPassword : e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const {userName, email, password,confirmPassword} = this.state;
        if(email && password && confirmPassword && userName)
        this.props.dispatch(signup(userName,email,password,confirmPassword))
    }

    render() { 
        const {error,inProgress,isLoggedin} = this.props.auth;
        if(isLoggedin){
            return <Redirect to="/codeial" />
        }
        return ( <div>
            <form className="login-form">
                <span className="login-signup-header" >Sign Up</span>
                {error && <div className="alert error-dailog">{error}</div>}
                <div className="field" >
                    <input type="text" onChange={this.handleNameChange} placeholder="Name" required />
                </div>
                <div className="field" >
                    <input type="email" onChange={this.handleEmailChange} placeholder="Email" required />
                </div>
                <div className="field" >
                    <input type="password" onChange={this.handlePasswordChange} placeholder="Password" required /> 
                </div>
                <div className="field" >
                    <input type="password" onChange={this.handleConfirmPasswordChange} placeholder="Confirm Password" required /> 
                </div>
                <div className="field" >
                {
                    inProgress ? 
                    <button onClick={this.handleSubmit} disabled={inProgress} >Signing In...</button>
                    :
                    <button onClick={this.handleSubmit} disabled={inProgress} >Sign Up</button>
                }
                </div>
            </form>
        </div> );
    }
}
 
function mapStateToProps (state){
    return{
        auth:state.auth
    }
}

export default connect(mapStateToProps)(Signup);