import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './AddCompetition.css';
import axios from 'axios';
import S3FileUpload from 'react-s3';


class AddCompetition extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: "",
            start_date: "",
            end_date:"",
            description:"",
            rules:"",
            rubrics:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount(){
        
    }

    handleInputChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }

      handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target)
        const awsconfig = {
            bucketName: 'humbercferules',
            dirName: 'rules', /* optional */
            region: 'us-east-1',
            accessKeyId: 'AKIASB2AS5ZH73XGLQUX',
            secretAccessKey: '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',
        }
        const awsconfig1 = {
            bucketName: 'humbercferules',
            dirName: 'rubrics', /* optional */
            region: 'us-east-1',
            accessKeyId: 'AKIASB2AS5ZH73XGLQUX',
            secretAccessKey: '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',
        }
        var r2=event.target.rubrics.files[0];
        var r1=event.target.rules.files[0];
        console.log(r1);
        console.log(r2);
        var rules="";
        var datarule = await S3FileUpload.uploadFile(r1,awsconfig)
            rules=datarule.location;
        var rubrics=""
        var data1 = await S3FileUpload.uploadFile(r2,awsconfig1)
            rubrics=data1.location
               
        
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = {
            title: this.state.title,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            rules: rules,
            rubrics: rubrics
        };
        console.log(data);
        axios.post('/api/competitions/', data, {config})
            .then(response => {
                console.log(response.data._id);
                const id = response.data._id;
                this.props.history.push("/admin/addsurvey/" + id);
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
                                    <input type="text" className="form-control" placeholder="Title" name ="title" onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Description:</label>
                                    <textarea className="form-control" id="validationTextarea" placeholder="Enter Competition Description here" rows="20" name="description" onChange={this.handleInputChange}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Start Date:</label>
                                    <input type="date" className="form-control" onChange={this.handleInputChange} name="start_date"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Deadline: </label>
                                    <input type="date" className="form-control" onChange={this.handleInputChange} name="end_date"/>
                                </div>
                            </div>
                            <div className="row">                               
                                <div className="addcompinput">
                                    <label>Rules: </label>
                                    <input type="file" id="rules"className="btn" name="rules" accept=".doc,.docx,.pdf" ref={rules => this.rules = rules} onChange={this.uploadRules} name="rules"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="addcompinput">
                                    <label>Rubrics: </label>
                                    <input type="file" className="btn" name="rubrics" accept=".doc,.docx,.pdf" name="rubrics" onChange={this.handleInputChange}/>
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
export default withRouter(AddCompetition);