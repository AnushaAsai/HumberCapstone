import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
class CompetitionDetails extends Component {
    constructor(props){
        super(props);
        this.handleSubmit.bind(this);
        this.state ={
            competition:{}
        }
    }  
    
    componentDidMount(){
        //console.log(this.props)
        const{comp_id} = this.props.match.params;
        axios.get('/api/competitions/'+comp_id)
        .then(res=>{
            //this.props.onchangeLocation(res.data.title);
            this.setState({competition:res.data});
            console.log(this.state.competition);
        })
    }
    handleDelete(comp_id){
       //axios.delete('/api/competitions/'+this.state.competition._id) 
    }
    handleEdit(comp_id){
        this.props.history.push("/admin/editcompetition/"+comp_id)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.delete('/api/competitions/'+event.target.value)
          .then(res => {
          console.log(res);
          this.props.history.push("/admin/dashboard/")
          });
      }
    render() {
        return (
            <div>
                <h1>{this.state.competition.title}</h1>
                <div>
                    <div className="competition-details-description">Description</div>
                    <div className="container-fluid">
                        <p>
                        {this.state.competition.description}
                        </p>
                    </div>
                    <Row>
                                        <Col>
                                        <a target="_blank" href={this.state.competition.rules} target="_blank" className="btn btn-dark"> Rules </a>
                                        <a target="_blank" href={this.state.competition.rubrics} target="_blank" className="btn btn-dark"> Rubrics </a>
                                        </Col>
                                    </Row>
                    <div className="competition-details-buttons">
                        <button onClick={this.handleEdit.bind(this,this.state.competition._id)} className="btn btn-success btn-cd-edit">Edit</button>
                        <button key = {this.state.competition._id} value= {this.state.competition._id} onClick={this.handleSubmit.bind(this.state.competition._id)} className="btn btn-danger btn-cd-delete">Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(CompetitionDetails);