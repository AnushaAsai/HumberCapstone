import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
class CompetitionDetails extends Component {
    constructor(props){
        super(props);
        this.state ={
            competition:{}
        }
    }
    componentDidMount(){
        const{comp_id} = this.props.match.params;
        axios.get('/api/competitions/'+comp_id)
        .then(res=>{
            //this.props.onchangeLocation(res.data.title);
            this.setState({competition:res.data});
            console.log(this.state.competition);
        })
    }
    handleApply(comp_id){
        var link ='/survey/'+comp_id
        this.props.history.push(link);
    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                        <h1>{this.state.competition.title}</h1>        
                        </Col>
                    </Row>
                    <Row>
                        <Col>
        <p>{this.state.competition.description}</p>
                        </Col>
                    </Row>
                    <Row>
                                        <Col>
                                        <a target="_blank" href={this.state.competition.rules} className="btn btn-dark"> Rules </a>
                                        <a target="_blank" href={this.state.competition.rubrics} className="btn btn-dark"> Rubrics </a>
                                        </Col>
                                    </Row>
                <div>
                    <div className="competition-details-buttons">
                        {/* <button onClick={this.handleApply.bind(this,this.state.competition._id)} className="btn btn-success btn-cd-edit">Edit</button> */}
                        <button onClick={this.handleApply.bind(this,this.state.competition._id)} className="btn btn-success btn-cd-delete">Apply</button>
                    </div>
                </div>
                </Container>
            </div>
        )
    }
}
 export default withRouter(CompetitionDetails);