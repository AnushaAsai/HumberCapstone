import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './EditCompetition.css';
import axios from 'axios';

class EditCompetition extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            competition: "",
            title: "",
            start_date: "",
            end_date:"",
            description:"",
            rules:"",
            rubrics:"",
            surveys:[
                {question:  []}
            ]
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        const{comp_id} = this.props.match.params;
        axios.get('/api/competitions/'+comp_id)
        .then(res=>{
                this.setState({ competition: res.data });
        })
    }

    handleInputChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }

    handleSubmit = event => {
    event.preventDefault();    
  
    const data = {
        id: this.state._id,
        title: this.state.title,
        description: this.state.description,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        rules: this.state.rules,
        rubrics: this.state.rubrics,
    };
    if (this.state.title=="") {
        data.title=this.state.competition.title;
    }

    if (this.state.description=="") {
        data.description = this.state.competition.description;
    }

    if(this.state.start_date=="") {
        data.start_date = this.state.competition.start_date;
    }

    if(this.state.end_date=="" ) {
        data.end_date = this.state.competition.end_date;
    }

    data.surveys = this.state.competition.surveys;

    console.log(data)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.put('/api/competitions/' +this.state.competition._id, data, {config})
            .then(response => {
                const id = this.state.competition._id;
                this.props.history.push("/admin/editsurvey/" + id);
            })
            .catch(error => {
                //console.log(error.response.data.errors[0].msg);
            });
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="addcompetition-form">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Title:</label>
                                    <input type="text" className="form-control" placeholder="Title" name ="title" 
                                    defaultValue={this.state.competition.title} key = {this.state.competition._id} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Description:</label>
                                    <textarea className="form-control" id="validationTextarea" placeholder="Enter Competition Description here" rows="20" 
                                    name="description" defaultValue={this.state.competition.description} key = {this.state.competition._id}
                                    onChange={this.handleInputChange}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Start Date:</label>
                                    <input type="date" className="form-control" defaultValue={this.state.competition.start_date} 
                                    key = {this.state.competition._id} name="start_date" onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Deadline: </label>
                                    <input type="date" className="form-control"  name="end_date" defaultValue={this.state.competition.end_date}
                                    key = {this.state.competition._id} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="row">                               
                                <div className="addcompinput">
                                    <label>Rules: </label>
                                    <input type="file" id="rules"className="btn" accept=".doc,.docx,.pdf" ref={rules => this.rules = rules} name="rules" onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Rubrics: </label>
                                    <input type="file" className="btn" accept=".doc,.docx,.pdf" name="rubrics" onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-success btn-submit-admin" value="Next" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(EditCompetition);