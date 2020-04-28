import React, { Component } from 'react'
import axios from 'axios';
import { Dropdown, Container, Col, Row, Form } from 'react-bootstrap';

export default class EmailContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            judges: "",
            students: ""
        }
    }

    componentDidMount() {
        console.log(this.props)
        const { comp_id } = this.props.match.params;
        axios.get('/api/judges/')
            .then(res => {
                console.log(res.data);
                //this.props.onchangeLocation(res.data.title);
                var compjudges="";
                res.data.forEach(element => {
                    element.competitionAssigned.forEach(competition => {
                        if (competition.competition === comp_id) {
                            if(compjudges==""){
                                compjudges=element.email
                            }else{
                                compjudges+=","+element.email
                            }
                        }
                    })
                });
                this.setState({judges:compjudges})
                //this.setState({judges:res.data});
            })
        axios.get('/api/students/')
            .then(res => {
                var compstudnet="";
                res.data.forEach(element => {
                    element.response.forEach(stu => {
                        if (stu.competition === comp_id) {
                            if(compstudnet==""){
                                compstudnet=element.email
                            }else{
                                compstudnet+=","+element.email
                            }
                        }
                    })
                })
                this.setState({students:compstudnet});
                //this.props.onchangeLocation(res.data.title);

            })

    }
    handleSubmit = event =>{
        event.preventDefault();
        var flag=false;    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if(event.target.judge.checked){
        if(event.target.subject.value==="" || event.target.content.value===""){
            alert("Please Enter Subject and Content")
        }else{
        var emailsubject = event.target.subject.value;
        console.log(emailsubject)
        flag=true;
        var data={
            to:this.state.judges,
            subject:event.target.subject.value,
            text:event.target.content.value
        }
        console.log(data)
        axios.post("/api/sendmail/",data,config)
        .then(res=>{
            alert("Email Sent")
            this.props.history.push("/admin/emails")
        })
    }

    }
        if(event.target.students.checked){
        if(event.target.subject.value==="" || event.target.content.value===""){
            alert("Please Enter Subject and Content")
        }else{
        var emailsubject = event.target.subject.value;
        console.log(emailsubject)
        flag=true;
        var data={
            to:this.state.students,
            subject:event.target.subject.value,
            text:event.target.content.value
        }
        axios.post("/api/sendmail/",data,config)
        .then(res=>{
            alert("Email Sent")
            this.props.history.push("/admin/emails")
        })
    }

    }
    if(!flag){
        alert('Please Select atleast one reciepent')
    }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <Container fluid className=" justify-content-center question">
                    <Row>
                        <Col>
                            <input type="checkbox" name = "judge" value="judges"/><label>Judges</label>
                        </Col>
                        <Col>
                            <input type="checkbox" name = "students" value = "students"/><label>Students</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <input type="text" name="subject" placeholder="Please Enter Subject Here" className="form-control"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <textarea name="content" className="form-control" rows="10" value="I would like to inform you about competition"> </textarea>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <input type="submit" name="sendmail" value="Send Email"/>
                        </Col>
                    </Row>

                </Container>
                </form>
            </div>
        )
    }
}
