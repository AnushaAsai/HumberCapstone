import React, { Component } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import './JudgeList.css';
import axios from 'axios'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
class JudgeList extends Component {
  constructor(props){
    super(props);
    this.handleSubmit.bind(this);
    this.state = {
      judges: []
    }
  }

  componentDidMount() {
    this.props.onchangeLocation("Judges");
    axios.get('/api/judges')
      .then(res => {
        this.setState({ judges: res.data });
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.delete('/api/judges/'+event.target.value)
      .then(res => {
      console.log(res);
      this.componentDidMount();
      });
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Link to="/admin/addjudge" className="btn btn-success addcompetition">Add Judge</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* const myData = [].concat(this.state.data)
    .sort((a, b) => a.itemM > b.itemM)
    .map((item, i) => 
        <div key={i}> {item.matchID} {item.timeM}{item.description}</div>
    ); */}
              <Table responsive="md">
                <thead>
                  <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th className="stu-hide">Email</th>
                    <th className="stu-hide">Designation</th>
                    <th>Assignements</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.judges.map(judge => {
                    return <tr key={judge._id}>
                      <td>{judge.firstname}</td>
                      <td>{judge.lastname}</td>
                      <td className="stu-hide">{judge.email}</td>
                      <td className="stu-hide">{judge.designation}</td>
                      {/* <td><Button>Go to Assignment</Button> */}
                      <td><Button className="btn btn-danger btn-judge" 
                      key = {judge._id} value= {judge._id} 
                      onClick={this.handleSubmit.bind(judge._id)}>Delete</Button></td>
                    </tr>
                  })}

                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default withRouter(JudgeList);