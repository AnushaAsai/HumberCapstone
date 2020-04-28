import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
class EditSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys:  []
        }
    }

    componentDidMount() {
        const{comp_id} = this.props.match.params;
        axios.get('/api/competitions/'+comp_id)
        .then(res=>{
            //this.props.onchangeLocation(res.data.title);
            this.setState({surveys:res.data.surveys});
            console.log(this.state.surveys);
        })
        this.props.onchangeLocation("Survey");
    }
    handleSubmit = event => {
        event.preventDefault();
        const data ={
            surveys : this.state.surveys
        }
        console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const{comp_id} = this.props.match.params;
        axios.put("/api/competitions/addsurvey/"+comp_id,data,config)
        .then(res=>{
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
        localStorage.setItem('questions', null)
        //this.props.history.push('/admin/dashboard');
    }
    addQuestion = event => {
        event.preventDefault();
        if(event.target.question.value.length<6){
            alert("Please enter valid Queston");
        }else{
        let newQuestion;
        if (event.target.qt.value === "textbox" || event.target.qt.value === "textarea") {
            newQuestion = {
                question: event.target.question.value,
                templateType: event.target.qt.value
            }
        } else {
            newQuestion = {
                question: event.target.question.value,
                templateType: event.target.qt.value,
                templateSpecification: event.target.options.value
            }
        }
        this.state.surveys.push(newQuestion)
        var questions = this.state.surveys;
        this.setState({ surveys: questions })
        localStorage.setItem('questions', JSON.stringify(this.state.surveys));
        console.log(this.state.surveys);
    }
    }
    selectionChanged = event => {
        this.setState({ qusestionType: event.target.value })
    }
    deleteQuestion(question) {
        this.setState({question:this.state.question.filter(t=>{return t.question!==question})});
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <button className="btn btn-success btn-submit-admin" onClick={this.handleSubmit}>Submit</button>
                    <div className="addcompetition-form">
                        <form onSubmit={this.addQuestion}>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Question:</label>
                                    <input type="text" className="form-control" name="question" placeholder="Question" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Answer Type:</label>
                                    <select className="custom-select" name="qt" required onChange={this.selectionChanged}>
                                        <option value="textbox">Textbox</option>
                                        <option value="radio">Radio Button</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="textarea">TextArea</option>
                                    </select>
                                </div>
                            </div>
                            {this.renderOption(this.state.qusestionType)}

                            <input type="submit" className="btn btn-success btn-add" value="Add" />
                        </form>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="admin-question">
                                {
                                    this.state.surveys.map(q => {
                                        if (q.templateType === "textbox")
                                            return (
                                                <div className="question" key={q.question}>
                                                    <Row>
                                                        <Col md={11}>
                                                            <label>{q.question}</label>
                                                        </Col>
                                                        <Col>
                                                            <svg onClick={this.deleteQuestion.bind(this,q.question)} className="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clipRule="evenodd" />
                                                            </svg>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={7}>
                                                            <input type={q.qusestionType} name={q._id} key={q._id} className="form-control" />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        else if (q.templateType === "textarea")
                                            return (
                                                <div className="question" key={q.question}>
                                                    <Row>
                                                    <Col md={11}>
                                                            <label>{q.question}</label>
                                                        </Col>
                                                        <Col>
                                                            <svg onClick={this.deleteQuestion.bind(this,q.question)} className="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clipRule="evenodd" />
                                                            </svg>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <textarea name={q.question} className="form-control">

                                                            </textarea>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        if (q.templateType === "file")
                                            return (
                                                <div className="question" key={q.question}>
                                                    <Row>
                                                    <Col md={11}>
                                                            <label>{q.question}</label>
                                                        </Col>
                                                        <Col>
                                                            <svg onClick={this.deleteQuestion.bind(this,q.question)} className="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clipRule="evenodd" />
                                                            </svg>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={5}>
                                                            <div className="input-group mb-3">
                                                                <input type={q.templateType} name={q._id} key={q.question} className="" />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        if (q.templateType === "checkbox") {
                                            var option = q.templateSpecification.split(",")
                                            return (
                                                <div className="question" key={q.question}>
                                                    <Row key={q.question} >
                                                    <Col md={11}>
                                                            <label>{q.question}</label>
                                                        </Col>
                                                        <Col>
                                                            <svg onClick={this.deleteQuestion.bind(this,q.question)} className="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clipRule="evenodd" />
                                                            </svg>
                                                        </Col>
                                                    </Row>
                                                    {option.map(op => {
                                                        return (<Row key={op}>
                                                            <Col md={5}>
                                                                <input type={q.templateType} name={q.question} key={q.question} />
                                                                <label >{op}</label>
                                                            </Col>
                                                        </Row>)
                                                    })}

                                                </div>
                                            )
                                        }
                                        if (q.templateType === "radio") {
                                            var options = q.templateSpecification.split(",")
                                            return (
                                                <div className="question" key={q.question}>
                                                    <Row>
                                                    <Col md={11}>
                                                            <label>{q.question}</label>
                                                        </Col>
                                                        <Col>
                                                            <svg onClick={this.deleteQuestion.bind(this,q.question)} className="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clipRule="evenodd" />
                                                            </svg>
                                                        </Col>
                                                    </Row>
                                                    {options.map(op => {
                                                        return (<Row key={op}>
                                                            <Col>

                                                                <input type={q.templateType} name={q.question} />
                                                                <label className="form-check-label">{op}</label>
                                                            </Col>
                                                        </Row>)
                                                    })}

                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    renderOption(templateType) {
        if (templateType === "radio" || templateType === "checkbox") {
            return (
                <div className="row">
                    <div className="col-6">
                        <label>Options:</label>
                        <input type="text" name="options" className="form-control" />
                    </div>
                </div>
            )
        }
    }
}
export default withRouter(EditSurvey);