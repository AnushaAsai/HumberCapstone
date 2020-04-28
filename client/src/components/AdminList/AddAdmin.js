import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import axios from 'axios';
var generator = require('generate-password');

class AddAdmin extends Component {
    constructor(props){
        super(props);
        this.handleSubmit.bind(this);
        this.state = {
            email: "",
            firstname:"",
            lastname:"",
            password:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }

      handleSubmit = event => {
        event.preventDefault();   
           
        const data = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.post('/api/admin', data, {config})
            .then(response => {
                console.log(response);
                this.props.history.push("/admin/adminlist");
            })
            .catch(error => {
                //console.log(error.response.data.errors[0].msg);
            });
    }

    render() {
        return (
            <div>
                <Container className="addjudge-container">
                    <Row>
                        <Col>
                            <h3>Add Admin</h3>
                            <small>Note*: Auto generated password will be sent to the specified email address</small>
                        </Col>
                    </Row>
                    <form className="addjudge-form" onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" placeholder="Enter Email here" onChange={this.handleInputChange}/>
                                <small className="form-text text-muted">ex: abcd@gmail.com</small>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <label>Firstname</label>
                                <input type="text" name="firstname" className="form-control" placeholder="Enter First Name here" onChange={this.handleInputChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <label>Lastname</label>
                                <input type="text" name="lastname" className="form-control" placeholder="Enter Last Name here" onChange={this.handleInputChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <input type="submit" value="Add Admin" className="btn btn-success btn-addjudge" />
                            </Col>
                        </Row>
                    </form>
                </Container>
            </div>
        )
    }
}

export default withRouter(AddAdmin);