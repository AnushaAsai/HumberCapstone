import React, { Component } from 'react';
import './StudentList.css';
import axios from 'axios';
import { Table, Container, Modal, Button } from 'react-bootstrap'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
class StudentsEnrolled extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit.bind(this);
        this.state = {
            selectedStudentId: '',
            students: [],
            showModal: false,
            judges: [],
            addedJudges: []
        };
    }
    componentDidMount() {
        // this.props.onchangeLocation("Student List");
        const { comp_id } = this.props.match.params;
        axios.get('/api/students')
            .then(res => {
                var list = res.data;
                list.map(student => {
                    student.response.map(r => {
                        if (r.competition === comp_id) {
                            return this.setState({ students: [...this.state.students, student] });
                        }
                    })
                })
            })
    }
    handleClose = (event) => {
        this.setState({ showModal: false })
    }
    handleOnchange = (event) => {
        if (event.target.checked) {
            this.setState({ addedJudges: [...this.state.addedJudges, event.target.value] });
        }

    }
    handleSaveChanges = (event) => {
        this.setState({ showModal: false })
        const { comp_id } = this.props.match.params;
        this.state.addedJudges.map(j=>{
        const data = {
            id: j,
            competitionAssigned: [
                {
                    competition: comp_id,
                    studentsAssigned: [
                        {
                            student: this.state.selectedStudentId
                        }
                    ]
                }
            ]
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.put('/api/judges/assign',data,config)
            .then(res => {
                console.log(res);
            })
        });
        this.setState({addedJudges:[]});
    }
    handleShowModal = (event) => {
        this.setState({ selectedStudentId: event.target.value });
        this.setState({ showModal: true });
        axios.get('/api/judges')
            .then(res => {
                this.setState({ judges: res.data });
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.delete('/api/students/' + event.target.value)
            .then(res => {
                console.log(res);
                window.location.reload(false)
            });
    }
    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.handleClose} centered size="lg">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <form>
                                <Table responsive="md">
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" /></th>
                                            <th>FirstName</th>
                                            <th>LastName</th>
                                            <th className="stu-hide">Email</th>
                                            <th className="stu-hide">Designation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.judges.map(judge => {
                                            return <tr key={judge._id}>
                                                <td><input type="checkbox" className="custom-checkbox" name="addjudge" value={judge._id} onClick={this.handleOnchange} /></td>
                                                <td>{judge.firstname}</td>
                                                <td>{judge.lastname}</td>
                                                <td className="stu-hide">{judge.email}</td>
                                                <td className="stu-hide">{judge.designation}</td>
                                            </tr>

                                        })}

                                    </tbody>
                                </Table>
                            </form>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
              </Button>
                        <Button variant="primary" onClick={this.handleSaveChanges}>
                            Save
              </Button>
                    </Modal.Footer>
                </Modal>
                <Container>
                    <Row>
                        <Col>
                            <Table responsive="xl">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th className="stu-hide">Email</th>
                                        <th className="stu-hide">Phone</th>
                                        <th>Assign to judge</th>
                                        <th>Delete the student </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.students.map(student => {
                                            return <tr key={student._id}>
                                                <td>{student.firstname}</td>
                                                <td>{student.lastname}</td>
                                                <td className="stu-hide">{student.email}</td>
                                                <td className="stu-hide">{student.phone}</td>
                                                <td><button className="btn btn-success btn-student" value={student._id} onClick={this.handleShowModal}>Assign</button></td>
                                                <td>
                                                    <button className="btn btn-danger btn-student" key={student._id} value={student._id} onClick={this.handleSubmit.bind(this,student._id)}>Delete</button></td>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}
export default withRouter(StudentsEnrolled);