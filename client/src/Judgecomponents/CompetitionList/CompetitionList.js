import React, { Component } from 'react';
import './CompetitionList.css';
import { TabContainer, Button } from 'react-bootstrap'
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
export default withRouter (class CompetitionList extends Component {
    state = {
        competitions: []
    };
    componentDidMount() {
        this.props.onchangeLocation("Home");
         let decodeId = decode(localStorage.getItem('judgeToken'));
        axios.get('/api/judges/' + decodeId.judge.id)
            .then(res => {
                res.data.competitionAssigned.map(s => {
                    axios.get('/api/competitions/' + s.competition)
                        .then(res => {
                            this.setState({ competitions: [...this.state.competitions, res.data] });
                        })
                })
            })
    }
    handleGO(competition_id) {
        var link = '/judge/studentlist/' + competition_id
        this.props.history.push(link);
    }
    render() {
        return (
            <div>
                <TabContainer>
                    <Col>
                        <Row>

                            {
                                this.state.competitions.map(comp => {
                                    return <div className="card-competition" key={comp._id}>
                                        <div className="card-body">
                                            <h5 className="card-title">{comp.title}</h5>
                                            <p className="card-text">{comp.description}</p>
                                            <h6 className="card-subtitle mb-2 text-muted">{comp.end_date}</h6>
                                            <Row>
                                        <Col>
                                        <a href={comp.rules} className="btn btn-dark"> Rules </a>
                                        <a href={comp.rubrics} className="btn btn-dark"> Rubrics </a>
                                        </Col>
                                        <Col>
                                        <Button variant="outline-success" onClick={this.handleGO.bind(this, comp._id)}>Assiged Students</Button>
                                        </Col>
                                    </Row>
                                        </div>
                                    </div>
                                })
                            }


                        </Row>
                    </Col>
                </TabContainer>
            </div>
        )
    }
})
