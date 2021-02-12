import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios'

// import default style
import 'rsuite/dist/styles/rsuite-dark.css'; // or 'rsuite/dist/styles/rsuite-default.css'
//import 'bootstrap/dist/css/bootstrap.min.css';


//Components
import NavbarUser from './components/NavbarUser';
import Profile from './components/Profile';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

const API = 'http://alexipv4.com:8000/api/';

class App extends Component {

  state = {
    isAuthenticating: true,
    logged: false,
    user: []
    //tasks: tasks
  }

  
  setUserLogin = (logged) => {
    this.setState({logged: logged, user: []})
  }


  componentDidMount() {
    
    axios
        .get(API+'user', { withCredentials: true })
        .then((response) => 
        {
            if(response.data.id !== undefined)
            {
                //console.log("LOGGED");
                this.setState({logged: true, 
                               user: response.data});
            }
            else console.log("NOT LOGGED");
            this.setState({isAuthenticating: false})
            console.log(response);
        });
        
  }




  checkLog = () => {
    return this.state.logged;
  }


  changeUsername = (newUsername) => {
    let newUser = this.state.user;
    newUser.username = newUsername;
    this.setState({user: newUser})
  }

  render() {
    //first we see if we are authenticating for avoid bugs
    if(this.state.isAuthenticating) return null;

    
    console.log(this.state.user);
    return (
      <div>
        <Router>
          <NavbarUser 
            logged={this.state.logged}
            user={this.state.user}
            setUserLogin={this.setUserLogin}
          />
          <Route exact path="/Schedule">
            <h1>SCHEDULE</h1>
          </Route>  
          <Route exact path="/Subjects">
            <h1>Subjects</h1>
          </Route>  
          <Route exact path="/Profile">
            <Profile
                logged={this.state.logged}
                user={this.state.user}
                changeUsername={this.changeUsername}
            />
          </Route>   
        </Router>
      </div>
    )
  }
}


export default App;
