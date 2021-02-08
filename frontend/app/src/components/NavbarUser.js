import React, { Component } from 'react';
import { Navbar, Nav, Icon, Avatar, Row, Col, Grid } from 'rsuite';
//import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import './NavbarUser.css'

//icons 
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const API = 'http://alexipv4.com:8000/api/';


export default class NavbarUser extends Component {

    
    state = {
        //activekey: null
    }

    handleSelect = (eventKey) => {
        this.setState({
            
        });
        console.log(this.state.activekey)
    }

    redirectTo = (eventKey) => {
        switch(eventKey){
            case "Sign Out":
                this.LogOut();
                break;
        }
        
        //window.location = url;
    }

    LogOut= () => {
        axios
            .get(API+'logout', { withCredentials: true })
            .then((response) => 
            {
                
                if(response.data.logged !== undefined)  this.props.setUserLogin(response.data.logged);
                else console.log("ERROR LOGGING OUT");
                
            });
    }

    UserLogged = () => {
        return (<Nav pullRight onSelect={this.redirectTo} >
                    <Nav.Item eventKey="Profile" className ="UserNav">
                        <div>
                            <div className="divImg"><img className="UserImage" src={this.props.user.pictureUrl}/></div>
                            <div className="divTxt"><p className="TextNavbar">Profile</p></div>
                        </div>
                    </Nav.Item>
                    <Nav.Item eventKey="Sign Out">Sign Out</Nav.Item>
                </Nav>)
    }

    UserNotLogged = () => {
        return (<Nav pullRight>
                    <Nav.Item href={('http://alexipv4.com:8000/google')}>Log In</Nav.Item>
                </Nav>)
    }

    UserInterface = () => {
        if(this.props.logged) return <this.UserLogged/>
        else return <this.UserNotLogged/>
    }

    NavBarInstance = () => {
        return (
            <Navbar appearance="default" >
                <Navbar.Header>
                    <a href="#" className="navbar-brand logo">
                    MEETS & SCHEDULE
                    </a>
                </Navbar.Header>
                <Navbar.Body>
                    <Nav >
                    <Nav.Item eventKey="1" >
                        Home
                    </Nav.Item>
                    <Nav.Item eventKey="2">News</Nav.Item>
                    <Nav.Item eventKey="3">Products</Nav.Item>
                    </Nav>
                    <this.UserInterface/>
                    
                    
                </Navbar.Body>
            </Navbar>
            
        )
    }

   
   
    render() {
        
        //console.log(this.state.user)
        return (
            <div>
                
                <this.NavBarInstance/>
                
            </div>
        )
    }
}
