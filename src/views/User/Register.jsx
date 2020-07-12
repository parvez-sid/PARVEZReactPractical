import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, Form, FormGroup, Label, Input, Button, CustomInput } from "reactstrap";
import swal from 'sweetalert';
import ApiHandler from '../../ApiHandler';

class RegisterUser extends Component {
    constructor(props){
        super(props);
        this.state={
            hobbies : [],
            firstname : '',
            lastname : '',
            email: '',
            password : '',
            gender : '',
            country : '',
            city : '',
            selected_hobbies : []
        }
    }
    //get hobbies
    componentDidMount(){
        var that = this;
        ApiHandler.getHobbies(function(response){
            if(response.status === 200){
            that.setState({
                hobbies : response.data
            })
            }
        })
    }
    // Handling Multiple Select
    handleMultiSelect(event) {
        this.setState({selected_hobbies: [...event.target.selectedOptions].map(o => o.value)});
    }
    
    handleRegister (e) {
        e.preventDefault();
        e.stopPropagation();

        var state = this.state;

        var payload={
            firstname : state.firstname,
            lastname : state.lastname,
            email : state.email,
            password : state.password,
            gender : state.gender,
            country : state.country,
            city : state.city,
            hobbies : state.selected_hobbies
        };
        ApiHandler.signUp(payload, function (response){
            if(response.status === 200){
              swal("Success!", response.data+"!", "success")
              .then(()=>{
                window.location = '/';
              })
            }
            else {
              swal('Oops',response.response.data.message,'error')
            }
        })
    }

    // Input field value
    handleInputValue=(event)  => {
        this.setState({[event.target.name] : event.target.value})
    }

    render() {
        let hobbiesList = this.state.hobbies.map((hobby) =>
            <option key={hobby._id} value={hobby.hobby_name}>{hobby.hobby_name}</option>
        );
        return(
            <>
            <Container>
            <Jumbotron>
                <Row>
                    <Col>
                        <h1>Register</h1>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md="12">
                    <Form method="POST" onSubmit={(e)=>this.handleRegister(e)}>
                        <FormGroup>
                            <Label for="firstname">First Name</Label>
                            <Input
                            type="text"
                            name="firstname"
                            id="firstname"
                            onChange={e => this.handleInputValue(e)}
                            placeholder="Please enter first name"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastname">Last Name</Label>
                            <Input
                            type="text"
                            name="lastname"
                            id="lastname"
                            onChange={e => this.handleInputValue(e)}
                            placeholder="Please enter last name"
                            required
                            />
                        </FormGroup>
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
                            placeholder="Create a password"
                            minLength="8"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="country">Country</Label>
                            <Input
                            type="text"
                            name="country"
                            id="country"
                            onChange={e => this.handleInputValue(e)}
                            placeholder="Please enter country name"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input
                            type="text"
                            name="city"
                            id="city"
                            onChange={e => this.handleInputValue(e)}
                            placeholder="Please enter city name"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="gender">Gender</Label>
                            <CustomInput type="select" id="gender" name="gender" onChange={e => this.handleInputValue(e)} required>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <Label for="hobbies">Select your hobbies</Label>
                            <CustomInput type="select" id="hobby" name="hobby" onChange={event => this.handleMultiSelect(event)} required multiple>
                            <option value="">Select</option>
                            {hobbiesList}
                            </CustomInput>
                        </FormGroup>
                        <FormGroup check row>
                            <Col>
                            <Button className="float-right">Submit</Button>
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
export default RegisterUser;