import React, { Component } from 'react';
import { Navbar, Nav, Icon, Avatar, Row, Col, Grid } from 'rsuite';
import  { Redirect  } from 'react-router-dom'
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
            default:
                console.log(eventKey);
                return <Redirect to={('/'+eventKey)}/>
                //this.props.history.push('/'+eventKey)
                //this.props.history.push('/'+eventKey)

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
        return (<Navbar.Body><Nav>
                    <Nav.Item href="/Schedule">Schedule</Nav.Item>
                    <Nav.Item href="/Subjects">Subjects</Nav.Item>
                </Nav>
                <Nav pullRight onSelect={this.redirectTo} >
                    <Nav.Item eventKey="Profile" className ="UserNav" href="/profile">
                        <div>
                            <div className="divImg"><img className="UserImage" src={this.props.user.pictureUrl}/></div>
                            <div className="divTxt"><p className="TextNavbar">Profile</p></div>
                        </div>
                    </Nav.Item>
                    <Nav.Item eventKey="Sign Out">Sign Out</Nav.Item>
                </Nav></Navbar.Body>)
    }

    UserNotLogged = () => {
        return (<Navbar.Body><Nav pullRight>
                    <Nav.Item href={('http://alexipv4.com:8000/google')}>Log In</Nav.Item>
                </Nav></Navbar.Body>)
    }

    UserInterface = () => {
        if(this.props.logged) return <this.UserLogged/>
        else return <this.UserNotLogged/>
    }

    NavBarInstance = () => {
        return (
            <Navbar appearance="default" >
                <Navbar.Header>
                    <a href="/" className="navbar-brand logo">
                    <img  className="navLogo" src="/logo.png"/>
                    </a>
                </Navbar.Header>
                <this.UserInterface/>
                
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
