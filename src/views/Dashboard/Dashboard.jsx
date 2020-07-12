import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, Button, Card, CardTitle, CardText } from "reactstrap";
import swal from 'sweetalert';
import ApiHandler from '../../ApiHandler';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            users : [],
        }
    }

    //get users from system
    componentDidMount() {
        var that = this;
        ApiHandler.getUsers(function(response){
            if(response.status === 200){
            that.setState({
                users : response.data
            })
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

    // send friend request to a user
    sendFriendRequest (request_send_to_user) {
        var payload = {
            sent_to : request_send_to_user
        };
        ApiHandler.sendRequest(payload, function (response){
            if(response.status === 200){
              swal("Success!", response.data+"!", "success")
              .then(() => {
                window.location.reload();
              })
            }
            else {
              swal('Oops',response.response.data.message,'error')
            }
        })
    }
    render() {
        let userList = this.state.users.map((user) =>
            <Row key={user._id}>
                <Col>
                <Card body inverse color="secondary">
                    <CardTitle>{user.firstname + ' ' + user.lastname}, {user.city}, {user.country}</CardTitle>
                    <CardText>{user.gender}</CardText>
                    <CardText><span className="text-bold">Hobbies :</span> {Array.prototype.map.call(user.hobbies, function(hobby) { return hobby; }).join(", ")} </CardText>
                    <Row>
                        {
                        user.user_list && user.user_list.sent_to === localStorage.getItem('user_id')
                        ? 
                        <Col md="12">
                            <Button color="primary" className="float-right">Decline</Button>
                            <Button color="primary" className="float-right" style={{marginRight : '5px'}}>Accept</Button>
                        </Col>
                        :
                        <Col md="12">
                        <Button color="primary" className="float-right" onClick={() => this.sendFriendRequest(user._id)}>
                            Add Friend
                        </Button>
                        </Col>
                        }
                    </Row>
                </Card><hr/>
                </Col>
            </Row>
        );
        return(
            <>
            <Container>
            <Jumbotron>
                <Row>
                    <Col md='6'>
                        <h1>Dashboard</h1>
                    </Col>
                    <Col md='6'>
                        <h3 className="float-right">{localStorage.getItem('user_name')}</h3>
                    </Col>
                </Row>
                <hr/>
                {userList}
            </Jumbotron>
            </Container>
            </>
        )
    }
}
export default Dashboard;