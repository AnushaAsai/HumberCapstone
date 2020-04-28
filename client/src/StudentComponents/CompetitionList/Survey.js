import React, { Component } from 'react'
import { Container, Row, Col, Toast } from 'react-bootstrap'
import axios from 'axios'
import decode from 'jwt-decode';
import S3FileUpload from 'react-s3';

const awsConfig = {
    bucketName: 'humbercferules',
    dirName: 'submissions', /* optional */
    region: 'us-east-1',
    accessKeyId: 'AKIASB2AS5ZH73XGLQUX',
    secretAccessKey: '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',
}
export default class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            response: [],
            file: "",
            checkbox: "",
            checkboxflag: false,
            errorMessage: '',
            competition_id: ''
        }
    }

    componentDidMount() {
        const { comp_id } = this.props.match.params;
        this.setState({competition_id:comp_id})
        axios.get('/api/competitions/' + comp_id)
            .then(res => {
                //this.props.onchangeLocation(res.data.title);
                this.setState({ surveys: res.data.surveys });
            })
    }
    handleDraft = event => {
        event.preventDefault();
        alert("saved as draft");
        console.log(this.state.surveys)
    }

    uploadFile = event => {

    }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ errorMessage: "" })
        console.log(event.target)
        var checkbox = "";
        var checkboxflag = false;
        var answeredAll = false;
        for (var i = 0; i < event.target.length; i++) {
            if (event.target[i].type === "text") {
                if (checkboxflag) {
                    this.state.response.push(this.state.checkbox);
                    checkboxflag = false;
                    checkbox = "";
                }
                if (event.target[i].value === "") {
                    answeredAll = false;
                } else {
                    this.state.response.push(event.target[i].value)
                    answeredAll = true;
                }
            } else if (event.target[i].type === "radio") {
                if (checkboxflag) {
                    this.state.response.push(this.state.checkbox);
                    checkboxflag = false;
                    checkbox = "";
                }
                if (event.target[i].checked) {
                    this.state.response.push(event.target[i].value)
                    answeredAll = true;
                } else {
                    answeredAll = false;
                }
            } else if (event.target[i].type === "checkbox") {

                if (event.target[i].checked) {
                    if (checkboxflag) {
                        let checkboxValue = checkbox + "," + event.target[i].value;
                        checkbox = checkboxValue;
                        answeredAll = true;
                    } else {
                        checkboxflag = true;
                        checkbox = event.target[i].value;
                        answeredAll = true;
                    }
                } else {
                    answeredAll = false;
                }

            }
        }
        // if (!answeredAll) {
        //     this.setState({ errorMessage: "Please answer all questions." })
        //     this.setState({ response: [] })
        // } else {
            if (checkboxflag) {
                this.state.response.push(checkbox)
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            // var { stu_id } = sessionStorage.getItem('stu_id')
            let decodeddata = decode(localStorage.getItem('studentToken'));
            var ans = []
            var filelocation;
            this.state.response.map(a => {
                {
                    ans.push({ 'surveryAnswer': a });
                }
            })
            S3FileUpload.uploadFile(event.target[0].files[0], awsConfig)
                .then((data) => {
                    filelocation = data.location
                    console.log(filelocation)
                }).then(d => {
                    const data = {
                        id: decodeddata.student.id,
                        response: [{
                            competition: this.state.competition_id,
                            file: filelocation,
                            answer: ans,
                            is_submitted: true
                        }
                        ]
                    }
                    console.log(data)
                    axios.put('/api/students/addresponse', data, { config })
                        .then(response => {
                            console.log(response)
                            this.setState({ response: [] })
                            alert("Response submitted successfully");
                            this.setState({ toast: true, toastBody: "justnow", toastTitle: "Response Added" });
                            this.props.history.push("/dashboard");
                        })
                        .catch(error => {
                            console.log(error);
                        });

                })
                .catch((err) => {
                    alert("Please upload a business plan")
                })
        
    }
    render() {
        var styles = { color: 'red' }
        return (
            <div>
                <div className="comp-title">
                    <h1 className="survey-heading">Competition 1</h1>
                </div>
                <Container fluid className="survey-container">
                    <Toast show={this.state.toast}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                    >
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">{this.state.toastTitle}</strong>
                        </Toast.Header>
                        <Toast.Body>{this.state.toastBody}</Toast.Body>
                    </Toast>
                    {<p style={styles}>{this.state.errorMessage}</p>}
                    <form onSubmit={this.handleSubmit}>
                        <div className="question">
                            <Row>
                                <Col>
                                    <label>Your Business Plan?</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <div className="input-group mb-3">
                                        <input type="file" name="bplan" className="" />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        {

                            this.state.surveys.map(question => {
                                if (question.templateType === "textbox")
                                    return (
                                        <div className="question" key={question._id}>
                                            <Row>
                                                <Col>
                                                    <label>{question.question}</label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={5}>

                                                    <input type={question.templateType} name={question._id} key={question._id} className="form-control" />

                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                if (question.templateType === "file")
                                    return (
                                        <div className="question">
                                            <Row>
                                                <Col>
                                                    <label>{question.question}</label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={5}>
                                                    <div className="input-group mb-3">
                                                        <input type={question.templateType} name={question._id} key={question._id} className="" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                if (question.templateType === "checkbox") {
                                    var option = question.templateSpecification[0].split(",")
                                    return (
                                        <div className="question">
                                            <Row>
                                                <Col>
                                                    <label>{question.question}</label>
                                                </Col>
                                            </Row>
                                            {option.map(op => {
                                                return (<Row>
                                                    <Col md={5}>
                                                        <input type={question.templateType} name={question.question} key={question._id} value={op} />
                                                        <label >{op}</label>
                                                    </Col>
                                                </Row>)
                                            })}

                                        </div>
                                    )
                                }
                                if (question.templateType === "radio") {
                                    var options = question.templateSpecification[0].split(",")
                                    return (
                                        <div className="question" key={question._id}>
                                            <Row>
                                                <Col>
                                                    <label>{question.question}</label>
                                                </Col>
                                            </Row>
                                            {options.map(op => {
                                                return (<Row key={op}>
                                                    <Col>

                                                        <input type={question.templateType} name={question._id} key={question._id} value={op} />
                                                        <label className="form-check-label">{op}</label>
                                                    </Col>
                                                </Row>)
                                            })}

                                        </div>
                                    )
                                }
                            })
                        }
                        <Row>
                            <Col>
                                <input type="submit" value="Submit" className="btn btn-success btn-survey" />
                                <input type="submit" value="Save As Draft" onClick={this.handleDraft} className="btn btn-secondary btn-survey" />
                            </Col>
                        </Row>
                    </form>
                </Container>
            </div>
        )
    }
}
