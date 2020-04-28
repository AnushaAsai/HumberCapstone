import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

class EditProfile extends Component {
    state = {
        firstname: "Yash",
        lastname: "Patel",
        email:"patel1234@gmail.com"
    }
    componentDidMount() {
        this.props.onchangeLocation(this.state.firstname + " " + this.state.lastname);
    }
    goBack = event =>{
        this.props.history.push('/admin/profile')
    }
    handleSave = event => {
        // this.props.history.push('/admin/profile')
    }
    handleInput = event => {
       let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]:val});
    }
    render() {
        return (
            <div>
                <Container fluid className="profile-container">
                    <Row>
                        <Col md={5}>
                            <h4>First Name:</h4><br/>
                            <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleInput} className="form-control"/>
                        </Col>
                        <Col md={5}>
                        <h4>Last Name:</h4><br/>
                            <input type="text" name="lastname" value={this.state.lastname} className="form-control" onChange={this.handleInput}/>
                        </Col>
                        <Col md={2}>
                        <svg onClick={this.goBack} className="bi bi-arrow-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                            </svg>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <h6>Email : </h6><br/>
                            <input type="email" name="email" value={this.state.email} className="form-control" onChange={this.handleInput}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Designation : Admin</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            
                            <input type="submit" onClick={this.handleSave} value="Save" className="btn btn-success"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default withRouter(EditProfile);