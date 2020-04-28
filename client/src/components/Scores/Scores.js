import React, { Component } from 'react'
import './Scores.css'
import { Container, Row, Col, Modal, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
class Scores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStudentId: '',
            students: [],
            showModal: false,
            judges: [],
            scoresPerStudent: [],
            avgScore:''
        };

    };

    componentDidMount() {
        const { competition_id } = this.props.match.params;
        axios.get('/api/students')
            .then(res => {
                console.log(res.data);
                res.data.map(student => {
                    student.response.map(r => {
                        if (r.competition === competition_id) {
                            return this.setState({ students: [...this.state.students, student] });
                        }
                    })

                })
            })
    }
    handleClose = (event) => {
        this.setState({ showModal: false })
        this.setState({scoresPerStudent:[]})
        this.setState({avgScore:''});
    }
    handleShowModal = (event) => {
        const { competition_id } = this.props.match.params;
        this.setState({ selectedStudentId: event.target.value });
        this.setState({ showModal: true });
        axios.get('/api/judges')
            .then(res => {
                console.log(res.data)
                res.data.map(r=>{
                    r.competitionAssigned.map(comp=>{
                        if(comp.competition===competition_id){
                            console.log(comp)
                            comp.studentsAssigned.map(s=>{
                                if(s.student===this.state.selectedStudentId){
                                    if(s.totalScore==undefined){
                                        return this.setState({ scoresPerStudent: [...this.state.scoresPerStudent,{"Judge_id":r._id,"Judge_mail": r.email,"Score":"Score Pending"}] });
                                    }else{
                                        return this.setState({ scoresPerStudent: [...this.state.scoresPerStudent,{"Judge_id":r._id,"Judge_mail": r.email,"Score":s.totalScore}] });
                                    }
                                    
                                }
                            })
                        }
                    })
                })
            })
            .then(res=>{
                console.log(this.state.scoresPerStudent)
                var sum=0;
                this.state.scoresPerStudent.map(s=>{
                    sum = sum + s.Score;
                })
                var avg = sum/this.state.scoresPerStudent.length
                this.setState({avgScore:avg});
            })
    }
    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.handleClose} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Average Score: {this.state.avgScore}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <form>
                                <Table responsive="md">
                                    <thead>
                                        <tr>
                                            <th>Judge email</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.scoresPerStudent.map(s => {
                                            return <tr key={s.Judge_id}>
                                                {/* <td><input type="checkbox" className="custom-checkbox" name="addjudge" value={judge._id} onClick={this.handleOnchange} /></td> */}
                                                <td>{s.Judge_mail}</td>
                                                <td>{s.Score}</td>
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
                        {/* <Button variant="primary" onClick={this.handleSaveChanges}>
                            Save
              </Button> */}
                    </Modal.Footer>
                </Modal>
                <Container>
                    <div>
                        <h2>View final scores</h2>
                    </div>
                    <Row>
                        <Col>
                            <Table responsive="xl">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th className="stu-hide">Email</th>
                                        <th className="stu-hide">Phone</th>
                                        <th>Scores</th>
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
                                                <td><button className="btn btn-success btn-student" value={student._id} onClick={this.handleShowModal}>View Scores</button></td>
                                                {/* <td> */}
                                                {/* <button className="btn btn-danger btn-student" key={student._id} value={student._id} onClick={this.handleSubmit.bind(student._id)}>Delete</button></td> */}
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
export default withRouter(Scores);
