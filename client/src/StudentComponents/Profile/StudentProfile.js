import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import axios from 'axios';

class StudentProfile extends Component {
    state = {
        firstname: "",
        lastname: "",
        email:""
    }
    componentDidMount() {
        let decodeddata = decode(localStorage.getItem('studentToken')); 
        this.setState({firstname:decodeddata.student.firstname})
        this.setState({lastname:decodeddata.student.lastname})
        this.props.onchangeLocation(this.state.firstname + " " + this.state.lastname);
        console.log(decodeddata.student.id)
        axios.get('/api/students/'+decodeddata.student.id)
            .then(res => {
                console.log(res.data)
                this.setState({ email: res.data.email });
            })
    }
    handleEdit = event => {
        this.props.history.push('/profile/editprofile')
    }
    render() {
        return (
            <div>
                <Container fluid className="profile-container">
                    <Row>
                        <Col md={6}>
                            <h4>First Name: {this.state.firstname}</h4>
                        </Col>
                        <Col md={5}>
                            <h4>Last Name: {this.state.lastname}</h4>
                        </Col>
                        <Col>
                            <svg onClick={this.handleEdit} className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clipRule="evenodd" />
                            </svg>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Email : {this.state.email}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Competitions Enrolled : Admin</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default withRouter(StudentProfile);