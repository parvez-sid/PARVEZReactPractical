import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, Form, FormGroup, Label, Input, Button } from "reactstrap";
import swal from 'sweetalert';
import ApiHandler from '../../ApiHandler';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            password : '',
            isLoggedIn :false
        }
    }
    // Login
    handleLogin(e){
        e.preventDefault();
        e.stopPropagation();

        var payload={
        email:this.state.email,
        password:this.state.password
        }
        ApiHandler.signIn(payload,function(response){
        if(response.status === 200){
            localStorage.setItem('user_name',response.data.firstname + ' ' + response.data.lastname);
            localStorage.setItem('email_id',response.data.email);
            localStorage.setItem('user_id',response.data._id);
            window.location = '/dashboard';
        }
        else if(response.response.data.message === "Session Expire"){
            swal("Oops!", "Session Expire Please Login Again!", "error")
            .then(() => {
            window.location = '/';
        });
    }
        else {
            swal('Oops',response.response.data.message,'error')
        }
        })
    }
    
    // Input field value
    handleInputValue=(event)  => {
        this.setState({[event.target.name]:event.target.value});
    }

    render() {
        return(
            <>
            <Container>
            <Jumbotron>
                <Row>
                    <Col>
                        <h1>Login</h1>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md="12">
                    <Form method="POST" onSubmit={(e)=>this.handleLogin(e)}>
                        
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                            type="email"
                            name="email"
                            id="email"
                            onChange={e => this.handleInputValue(e)}
                            placeholder="Please enter email"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                            type="password"
                            name="password"
                            id="password"
                            onChange={e => this.handleInputValue(e)}
                            placeholder="Please enter password"
                            minLength="8"
                            required
                            />
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Col>
                                <Button className="float-right">Login</Button>
                            </Col>
                        </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Jumbotron>
            </Container>
            </>
        )
    }
}
export default Login;