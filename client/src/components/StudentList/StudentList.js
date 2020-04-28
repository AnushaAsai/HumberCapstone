import React, { Component } from 'react';
import '../CompetitionList/CompetitionList.css';
import { Container } from 'react-bootstrap'
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class CompetitionWithStudentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: []
    };
  }

  componentDidMount() {
    this.props.onchangeLocation("Student List");
    axios.get('/api/competitions')
      .then(res => {
        console.log(res.data);
        this.setState({ competitions: res.data });
      })
  }
  handleGO(competition_id) {
    var link = '/admin/studentlist/' + competition_id
    this.props.history.push(link);
  }
  render() {

    return (
      <div>
        <div>
          <h2>Click on the competitions to view students enrolled</h2>
        </div>
        <Container>
          <Row>
            <Col>
              {
                this.state.competitions.map(comp => {
                  return <div className="card-competition" onClick={this.handleGO.bind(this, comp._id)} key={comp._id}>
                    <div className="card-body">
                      <h5 className="card-title">{comp.title}</h5>
                      <p className="card-text">{comp.description}</p>
                      <h6 className="card-subtitle mb-2 text-muted">{comp.end_date}</h6>
                    </div>
                  </div>
                })
              }
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(CompetitionWithStudentsList);