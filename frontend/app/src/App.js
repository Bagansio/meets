import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios'

// import default style
import 'rsuite/dist/styles/rsuite-dark.css'; // or 'rsuite/dist/styles/rsuite-default.css'
//import 'bootstrap/dist/css/bootstrap.min.css';


//Components
import NavbarUser from './components/NavbarUser';

const API = 'http://alexipv4.com:8000/api/';

class App extends Component {

  state = {
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
            console.log(response);
        });
        
  }

  render() {
    return <div>
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
          <h1>Profile</h1>
        </Route>   
      </Router>
    </div>
  }
}


export default App;
