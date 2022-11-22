import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { logOutUser } from '../actions/auth';
import { searchUsers } from '../actions/search';

class Navbar extends Component {


    logout = () => {
      localStorage.removeItem('token');
      this.props.dispatch(logOutUser());
    }
    handleSearch = (e) =>{
      const searchText  = e.target.value;
      this.props.dispatch(searchUsers(searchText,this.props.auth));
    }
    render() {
      const auth = this.props.auth;
      const {results} = this.props;

      
        return (
            <nav className="nav">
            <div className="left-div">
            <Link to= "/">
              <img
                src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                alt="logo"
              />
              </Link>
            </div>
            <div className="search-container">
              <img
                className="search-icon"
                src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
                alt="search-icon"
              />
              <input placeholder="Search" onChange={this.handleSearch} id="searchBar"/>
  

            { results.length > 0 && document.activeElement==document.getElementById("searchBar") && (
              <div className="search-results">
                <ul>
                {results.map((user) => (
                  <li className="search-results-row" key = {user._id}>
                  <Link to={`/user/${user._id}`} >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="user-dp"
                    />
                    <span>{user.name}</span>
                    </Link>
                  </li>

                ))}
                </ul>
              </div>
            )}





            </div>
            <div className="right-nav">
            {auth.isLoggedin &&
              <div className="user">
              <Link to='/settings' >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user-dp"
                  id="user-dp"
                />
                </Link>
                <span>{auth.user.name}</span>
              </div>
            }
              <div className="nav-links">
               
        <ul>
        { !auth.isLoggedin &&
          <li>
            <Link to="/login">Login</Link>
          </li>
        }
        { auth.isLoggedin &&
          <li onClick={this.logout} >
            Logout 
          </li>
        }
        { !auth.isLoggedin &&
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        }
        </ul>
              </div>
            </div>
          </nav>
        );
    }
}

function mapStateToProps(state){
  return{
    auth:state.auth,
    results:state.search.results,
  }
}

export default connect(mapStateToProps)(Navbar);