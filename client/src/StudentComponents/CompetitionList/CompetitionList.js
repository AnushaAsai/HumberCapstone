import React, { Component } from 'react';
import './CompetitionList.css';
import axios from 'axios';
import {Container} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class CompetitionList extends Component {
    state = {
        competitions: []
    };
    componentDidMount() {
        this.props.onchangeLocation("Home");

        axios.get('/api/competitions')
            .then(res => {
                this.setState({ competitions: res.data });
            })
    }
    handleGO(competition_id){
        var link ='/competitionDetails/'+competition_id
        this.props.history.push(link);
    }

    handleH = event =>{
        console.log("here");
        return(alert("go pushed"));
    }
    render() {
        return (
            <div>
                <Container fluid>
                    <div className="row comp-title">
                        <h1 className="stu-comp-title">Current Events & Competitions</h1>
                    </div>
                    <div className="row">
                            {
                                this.state.competitions.map(comp => {
                                    
                                    return (<div className="card-competition" key={comp._id} onClick={this.handleGO.bind(this,comp._id)} >
                                    <div className="card-body">
                                        <h5 className="card-title">{comp.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Deadline: {comp.end_date}</h6>
                                        <p className="card-text">{comp.description}</p>
                                    </div>
                                  </div>)
                                })
                            }
                            
                    </div>
                    </Container>
            </div>
        )
    }
}

export default withRouter(CompetitionList)