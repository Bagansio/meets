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
        <Route> 
          <NavbarUser 
              logged={this.state.logged}
              user={this.state.user}
              setUserLogin={this.setUserLogin}
          />
        </Route>    
      </Router>
    </div>
  }
}


export default App;
