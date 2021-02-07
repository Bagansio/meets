import React, { Component } from 'react'
import axios from 'axios'

const API = 'http://alexipv4.com:8000/api/';

export default class UserLogged extends Component {


    state = {
        logged: false,
        user: []
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

   
   userGreeting = () => {
    return <p>{this.state.user.username}</p>
   }
   
   guestGreeting = () => {
        return <p>NOT LOGGED</p>
   }
   userLogged = () => {
        if(this.state.logged)  return <this.userGreeting/>
        else return <this.guestGreeting/>
    }
   
   
    render() {
        /*if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }*/
        console.log(this.state.user)
        return (
            <div>
                <h1>Tasks</h1>
                <this.userLogged/>
            </div>
        )
    }
}
