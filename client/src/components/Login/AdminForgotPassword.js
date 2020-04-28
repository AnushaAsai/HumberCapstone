import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './ForgotPassword.css'
import axios from 'axios';
export default class AdminForgotPassword extends Component {
    state = {
        email:""
    }
    emailChange = event => {
        this.setState({email:event.target.value});
    }
    sendEmail = event => {
        if(this.state.email!==""){
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            let data = {
                email:this.state.email,
            }
            console.log(data)
            axios.post('/api/login/admin/forgotpassword', data, config)
                .then(response => {
                    console.log(response);
                    alert("Your new password is sent to your email")
                })
                .catch(error => {
                    // console.log(error.response.data.errors[0].msg);
                });
        }else{
            alert("Please Enter valid email");
        }
    }
    render() {
        return (
            <div>
                <Container className="forgot-container">
                    <Row>
                        <Col>
                        <img src="Humber_Centre-for-Entrepreneurship_blue-gold.gif" className="forgot-logo" alt="Logo" />
                        </Col>
                    </Row>
                <Row>
                        <Col>
                            <h3>Forgot Password (Admin)</h3>
                            <small>Your new password will be sent to your email.</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <label>Enter your email:</label><br/>
                            <input type="email" name="email" className="form-control" onChange={this.emailChange} placeholder="abcd@mail.com"/>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                        <input type="submit" value="Send Email" onClick={this.sendEmail} className="btn btn-success"/>
                        </Col>
                        </Row>
                        <Row style={{marginTop:"2rem"}}>
                        <Col>
                        Go back to <a href="/admin" className="fp"> Login</a>
                        </Col>
                        </Row>
                </Container>
            </div>
        )
    }
}
