import React, { Component } from 'react';
import './StudentList.css';
import { Table, Button } from 'react-bootstrap'
import axios from 'axios';
import decode from 'jwt-decode';
import { withRouter } from 'react-router-dom'
export default withRouter(class StudentList extends Component {
  state = {
    students: []
  };
  componentDidMount() {
    // this.props.onchangeLocation("Student List");
    let decodeId = decode(localStorage.getItem('judgeToken'));
    const { comp_id } = this.props.match.params;
    localStorage.setItem('comp_id',comp_id);
    axios.get('/api/judges/' + decodeId.judge.id)
      .then(res => {
        res.data.competitionAssigned.map(c => {
          if (c.competition === comp_id) {
            c.studentsAssigned.map(assg => {
              axios.get('/api/students/' + assg.student)
                .then(res => {
                  this.setState({ students: [...this.state.students, res.data] });
                })
            })
          }
        })
      })
  }

  handleGO(student_id) {
    var link = '/judge/showsurvey/' + student_id
    this.props.history.push(link);
  }
  render() {

    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Submissoins</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.students.map(student => {
                return <tr key={student._id} >
                  <td>{student.firstname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.email}</td>
                  <td><Button onClick={this.handleGO.bind(this, student._id)}>Go to Submissoins</Button></td>
                </tr>
              })
            }

          </tbody>
        </Table>


      </div>
    )
  }
})
