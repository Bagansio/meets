import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Input, InputGroup,Grid, Row, Col, Form, ControlLabel,FormGroup,FormControl, Button, HelpBlock} from 'rsuite';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const API = 'http://alexipv4.com:8000/api/';


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TODO : make this page only accesible for logged people!!!!!!! -> PROBABLY SOLVED
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default class Profile extends Component {


    
    state = {
        newUsername: '',
    }


    changeUsernameAPI = (newUsername,id) => {

        axios
            .post(API+'changeusername', {newUsername: newUsername, id: id})
            .then((response) => {
                if(response.data.succes)
                    {
                        console.log(response.data)
                        this.props.changeUsername(newUsername);
                    }
            })
        
    }

    onClick = e => {
        this.changeUsernameAPI(this.state.newUsername,this.props.user.id);
    }

    onChange = state_element => {
        this.setState(state_element)
    }

    ProfileLogged = () => {
        return(
            <div>
                <h1>PROFILE</h1>
                <hr />
                <Grid fluid>
                    <Row>
                        <Col xs={4}>
                            <p>USERNAME: {this.props.user.username}</p>
                        </Col>
                        <Col xs={12}>
                        <Form layout="inline" /*formValue={this.state.newUsername}*/ onChange={this.onChange}>
                            <FormGroup>
                                <FormControl placeholder ="New Username" name="newUsername" style={{ width: "160" }} />
                            </FormGroup>
                            <Button onClick={this.onClick}>Change it</Button>
                        </Form>
                            
                            {/*
                            <InputGroup size="sm" onChange={this.onChange} value={this.state.newUsername}>
                                <Input placeholder="New Username"/>
                                <InputGroup.Button>
                                    CHANGE
                                </InputGroup.Button>
                            </InputGroup>
                            */}

                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
    
    is_Logged = () => {

        if(this.props.logged) return <this.ProfileLogged/>
        else return <Redirect to={('/Schedule')}/>
    }

    render() {
        return(
            <this.is_Logged/>
        )
    }
}