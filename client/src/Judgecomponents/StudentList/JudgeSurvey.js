import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import decode from 'jwt-decode';
export default withRouter(class JudgeSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentResponse: [],
            student_id:'',
            totalScore:'',
            file:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const comp_id = localStorage.getItem('comp_id')
        const { stu_id } = this.props.match.params;
        this.setState({student_id:stu_id});
        var stud_answers = []
        axios.get('/api/students/' + stu_id)
            .then(res => {
                res.data.response.map(c => {
                    if (c.competition === comp_id) {
                        
                        this.setState({file:c.file})
                        c.answer.map(eachAns => {
                            stud_answers.push(eachAns.surveryAnswer)
                        })
                    }
                })
            }).then(res => {
                axios.get('/api/competitions/' + comp_id)
                    .then(res => {
                        var i = 0;
                        res.data.surveys.map(s => {
                            this.setState({
                                studentResponse: [...this.state.studentResponse,
                                { "stud_id": s._id, "question": s.question, "answer": stud_answers[i] }]
                            });
                            i++;
                        })

                    })
            })
    }
    handleScoreChange=event=>{
        this.setState({totalScore:event.target.value})

    }
    handleSubmit= event => {
        event.preventDefault();
        let decodeId = decode(localStorage.getItem('judgeToken'));
        const comp_id = localStorage.getItem('comp_id');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = {
            id: decodeId.judge.id,
            competition: comp_id,
            student: this.state.student_id,
            totalScore: this.state.totalScore
        };
        console.log(data);
        axios.put('/api/judges/updateScore/', data, { config })
            .then(response => {
                alert("Score submitted successfully!")
                this.props.history.push("/judge/dashboard");
            })
            .catch(error => {
                //console.log(error.response.data.errors[0].msg);
            });
    }
    render() {
        return (
            <div>
                <Container fluid className="survey-container">
                    {
                        this.state.studentResponse.map(r => {
                            return <div key={r.stud_id}>
                                <div className="question">
                                    <Row>
                                        <Col>
                                            {r.question}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {r.answer}
                                        </Col>
                                    </Row>
                                    
                                </div>
                            </div>
                        }
                        )
                    }
                    <div className="question">
                    <Row>
                                        <Col>
                                        <a href={this.state.file} target="_blank" className="btn btn-dark"> File Submitted </a>
                                        </Col>
                                    </Row>
                                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <label>Score:</label>
                                <input type="text" name="score" className="form-control" onChange={this.handleScoreChange} />
                                <input type="submit" value="Submit" className="btn btn-secondary btn-survey" />
                            </Col>
                        </Row>
                    </form>
                </Container>
            </div>
        )
    }
})
