import React, { Component } from 'react';
import { Navbar, Nav, Icon, Avatar, Row, Col, Grid } from 'rsuite';
import './NavbarUser.css'

//icons 
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';


const API = 'http://alexipv4.com:8000/api/';

const FaSvgIcon = ({ faIcon, ...rest }) => {
    const { width, height, svgPathData } = faIcon;
    return (
      <svg {...rest} viewBox={`0 0 ${width} ${height}`} width="2em" height="2em" fill="currentColor">
        <path d={svgPathData}></path>
      </svg>
    );
  };

export default class NavbarUser extends Component {


    state = {
    }

    
    redirectTo = (url) => {
        console.log(url);
        //window.location = url;
    }

    LogOut= () => {

    }

    UserLogged = () => {
        return (<Nav pullRight>
                    <Nav.Item className ="UserNav">
                        <div>
                            <div className="divImg"><img className="UserImage" src={this.props.user.pictureUrl}/></div>
                            <div className="divTxt"><p className="TextNavbar">Profile</p></div>
                        </div>
                    </Nav.Item>
                    <Nav.Item onFocus={this.redirectTo("YOO")}>Sign Out</Nav.Item>
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
        console.log()
        //console.log(this.state.user)
        return (
            <div>
                
                <this.NavBarInstance/>
                
            </div>
        )
    }
}
