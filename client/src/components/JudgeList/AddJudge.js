import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './JudgeList.css'
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class AddJudge extends Component {
    constructor(props){
        super(props);
        
        this.handleSubmit.bind(this);
        this.state = {
            email: "",
            firstname:"",
            lastname:"",
            password:"",
            designation:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }

      handleSubmit = event => {
        event.preventDefault();      
        const data = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            designation:this.state.designation
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.post('/api/judges/', data, {config})
            .then(response => {
                console.log(response);
                this.props.history.push("/admin/judgelist");
            })
            .catch(error => {
                //console.log(error.response.data.errors[0].msg);
            });
    }

    /*state={
        judge:{}
    }
    handleAddJudge = event =>{
        event.preventDefault();
       this.props.history.push("/admin/judgelist")
        // this.setState({judge:})
    }*/

    render() {
        return (
            <div>
                
               <Container fluid className=" justify-content-center addjudge-container">
               <Row>
                   <Col>
                   <h3>Add Judge</h3>
                   <small>Note*: Auto generated password will be sent to the specified email address</small>
                   </Col>
               </Row>
               <form onSubmit={this.handleSubmit} className="addjudge-form">
                   <Row>
                       <Col md={4}>
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" placeholder="Enter Judge email here" onChange={this.handleInputChange}/>
                            <small className="form-text text-muted">ex: abcd@gmail.com</small>
                       </Col>
                   </Row>
                   <Row>
                       <Col md={3}>
                            <label>FirstName</label>
                            <input type="text" name="firstname" className="form-control" placeholder="Enter First Name Here" onChange={this.handleInputChange}/>
                       </Col>
                   </Row>
                   <Row>
                       <Col md={3}>
                            <label>Lastname</label>
                            <input type="text" name="lastname" className="form-control" placeholder="Enter Last name here" onChange={this.handleInputChange}/>
                       </Col>
                   </Row>
                   <Row>
                       <Col md={2}>
                            <label>Designation</label>
                            <input type="text" name="designation" className="form-control" placeholder="Enter Designation here" onChange={this.handleInputChange}/>
                            <small className="form-text text-muted">ex: Professor, Entrepreneur</small>
                       </Col>
                   </Row>
                   <Row>
                       <Col>
                            <input type="submit" value="Add Judge" className="btn btn-success btn-addjudge"/>
                       </Col>
                   </Row>
                   </form>
                   </Container> 
                   
            </div>
        )
    }
}
export default withRouter(AddJudge);