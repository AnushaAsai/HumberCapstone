import React, { Component } from 'react';
import { Table ,Container} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class AdminList extends Component {
  constructor(props){
    super(props);
    this.handleSubmit.bind(this);
    this.state = {
      admins:[],
    };
}
  componentDidMount() {
    this.props.onchangeLocation("Admins");
    axios.get('/api/admin')
      .then(res => {
        console.log(res.data)
        this.setState({ admins: res.data });
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.delete('/api/admin/'+event.target.value)
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
              <Link to="/admin/addadmin" className="btn btn-success addcompetition">Add Admin</Link>
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
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.admins.map(admin => {
                    return <tr key={admin._id}>
                      <td>{admin.firstname}</td>
                      <td>{admin.lastname}</td>
                      <td className="stu-hide">{admin.email}</td>
                      <td><Button variant="danger" key = {admin._id} value= {admin._id} onClick={this.handleSubmit.bind(admin._id)}>Delete</Button></td>
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
export default withRouter(AdminList);